import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@components/ui/table";

import Badge from "@components/ui/badge/Badge";
import { useEffect, useState } from "react";
import { PencilIcon, TrashBinIcon } from "@icons/index";
import toast, { CheckmarkIcon } from "react-hot-toast";

type UserStatus = "Activo" | "Inactivo";

interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    status: UserStatus;
    roles: string[];
}

function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/users")
            .then((response) => response.json())
            .then((users) => {
                setUsers(users.data);
                setIsLoading(false);
            });
    }, []);

    const toggleStatus = async (userId: number) => {
        const foundIndexUser = users.findIndex((user) => user.id === userId);
        if (foundIndexUser >= 0) {
            const foundUser = users[foundIndexUser];
            foundUser.status =
                foundUser.status === "Activo" ? "Inactivo" : "Activo";
            const updatedUsers = [...users];
            updatedUsers[foundIndexUser] = foundUser;
            setUsers([...updatedUsers]);

            fetch(`/api/users/${userId}/toggle-status`, { method: "PATCH" })
                .then((response) => response.json())
                .then((updatedUser) => {
                    toast.custom(
                        (t) => (
                            <div
                                className={`${
                                    t.visible
                                        ? "animate-custom-enter"
                                        : "animate-custom-leave"
                                } flex items-center bg-white text-gray-800 shadow-lg rounded-lg max-w-80 pointer-events-auto px-2.5 py-2 dark:bg-gray-900 dark:text-white`}
                            >
                                <CheckmarkIcon />
                                <div
                                    className="flex justify-center mx-2.5 my-1"
                                    role="status"
                                    aria-live="polite"
                                >
                                    Usuario actualizado con éxito
                                </div>
                            </div>
                        ),
                        { position: "bottom-right" }
                    );
                    users[foundIndexUser] = updatedUser;
                    setUsers((users) => {
                        const foundIndexUser = users.findIndex(
                            (user) => user.id === userId
                        );
                        if (foundIndexUser >= 0) {
                            users[foundIndexUser] = updatedUser;
                        }
                        return [...users];
                    });
                })
                .catch(() => {
                    setUsers([...users]);
                });
        }
    };

    return { users, isLoading, toggleStatus };
}

export default function UsersTable() {
    const { users, isLoading, toggleStatus } = useUsers();
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/5">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Usuario
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Roles
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Fecha de creación
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs w-24 dark:text-gray-400"
                            >
                                Estado
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs w-24 dark:text-gray-400"
                            >
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                        {isLoading && (
                            <TableRow className="animate-pulse">
                                <TableCell className="px-5 py-4 sm:px-6 text-start">
                                    <div className="w-full">
                                        <div className="h-2.5 mt-2 mb-1.5 bg-gray-800/75 rounded-full w-3/5 dark:bg-white/65" />
                                        <div className="h-2 mb-1 bg-gray-500/75 rounded-full w-2/3 dark:bg-gray-400/75" />
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div className="h-2.5 bg-gray-500/75 rounded-full w-1/2 dark:bg-gray-400/75" />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div className="h-2.5 bg-gray-500/75 rounded-full w-3/4 dark:bg-gray-400/75" />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div className="h-5 bg-gray-500/45 rounded-full w-4/5 dark:bg-gray-400/45" />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div className="flex items-center w-full gap-2">
                                        <div className="h-5 w-5 bg-gray-500/75 rounded dark:bg-gray-400/75" />
                                        <div className="h-5 w-5 bg-gray-500/75 rounded dark:bg-gray-400/75" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="px-5 py-4 sm:px-6 text-start">
                                    <div>
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {user.name}
                                        </span>
                                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                            {user.email}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {user.roles.join(", ")}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    <span className="lg:hidden">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleString("es-BO", {
                                            day: "numeric",
                                            month: "numeric",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                    <span className="max-lg:hidden">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleString("es-BO", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    <button
                                        title={`${
                                            user.status === "Activo"
                                                ? "Deshabilitar"
                                                : "Habilitar"
                                        } usuario`}
                                        onClick={() => toggleStatus(user.id)}
                                    >
                                        <Badge
                                            size="sm"
                                            color={
                                                user.status === "Activo"
                                                    ? "success"
                                                    : "error"
                                            }
                                        >
                                            {user.status}
                                        </Badge>
                                    </button>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    <div className="flex items-center w-full gap-2">
                                        <button
                                            className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                                            title="Eliminar usuario"
                                        >
                                            <TrashBinIcon className="size-5" />
                                        </button>
                                        <button
                                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                                            title="Editar usuario"
                                        >
                                            <PencilIcon className="size-5" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
