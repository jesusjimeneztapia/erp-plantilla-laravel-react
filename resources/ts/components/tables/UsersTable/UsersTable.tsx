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
import toast, { CheckmarkIcon, ErrorIcon, LoaderIcon } from "react-hot-toast";

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
    const [userForDelete, setUserForDelete] = useState<User | null>(null);

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
        const originalUsers = users.map((user) => ({ ...user }));
        const foundIndexUser = users.findIndex((user) => user.id === userId);
        if (foundIndexUser >= 0) {
            const updatedUser = {
                ...users[foundIndexUser],
                status:
                    users[foundIndexUser].status === "Activo"
                        ? "Inactivo"
                        : ("Activo" as UserStatus),
            };

            setUsers((prev) => {
                prev[foundIndexUser] = updatedUser;
                return [...prev];
            });

            fetch(`/api/users/${userId}/toggle-status`, { method: "PATCH" })
                .then((response) => {
                    if (response.status !== 200) {
                        throw Error("Ocurrió algún error, intente más tarde");
                    }
                    return response.json();
                })
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

                    setUsers((prev) => {
                        const foundIndexUser = prev.findIndex(
                            (user) => user.id === userId
                        );
                        if (foundIndexUser >= 0) {
                            prev[foundIndexUser] = updatedUser;
                        }
                        return [...prev];
                    });
                })
                .catch(() => {
                    toast.custom(
                        (t) => (
                            <div
                                className={`${
                                    t.visible
                                        ? "animate-custom-enter"
                                        : "animate-custom-leave"
                                } flex items-center bg-white text-gray-800 shadow-lg rounded-lg max-w-80 pointer-events-auto px-2.5 py-2 dark:bg-gray-900 dark:text-white`}
                            >
                                <ErrorIcon />
                                <div
                                    className="flex justify-center mx-2.5 my-1"
                                    role="status"
                                    aria-live="polite"
                                >
                                    Error al actualizar el usuario
                                </div>
                            </div>
                        ),
                        { position: "bottom-right" }
                    );
                    setUsers([...originalUsers]);
                });
        }
    };

    const deleteUser = (user: User) => {
        setUserForDelete(user);
    };

    const cancelDeleteUser = () => {
        setUserForDelete(null);
    };

    const confirmDeleteUser = () => {
        if (userForDelete) {
            const toastId = toast.custom(
                (t) => (
                    <div
                        className={`${
                            t.visible
                                ? "animate-custom-enter"
                                : "animate-custom-leave"
                        } flex items-center bg-white text-gray-800 shadow-lg rounded-lg max-w-80 pointer-events-auto px-2.5 py-2 dark:bg-gray-900 dark:text-white`}
                    >
                        <LoaderIcon />
                        <div
                            className="flex justify-center mx-2.5 my-1"
                            role="status"
                            aria-live="polite"
                        >
                            Procesando solicitud
                        </div>
                    </div>
                ),
                { position: "bottom-right" }
            );
            const { id: userId } = userForDelete;
            setUserForDelete(null);

            fetch(`/api/users/${userId}`, { method: "DELETE" })
                .then((response) => {
                    toast.dismiss(toastId);
                    if (response.status !== 204) {
                        throw new Error("Error al eliminar");
                    }
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
                                    Usuario eliminado con éxito
                                </div>
                            </div>
                        ),
                        { position: "bottom-right" }
                    );
                    setUsers((prev) =>
                        prev.filter((user) => user.id !== userId)
                    );
                })
                .catch(() => {
                    toast.custom(
                        (t) => (
                            <div
                                className={`${
                                    t.visible
                                        ? "animate-custom-enter"
                                        : "animate-custom-leave"
                                } flex items-center bg-white text-gray-800 shadow-lg rounded-lg max-w-80 pointer-events-auto px-2.5 py-2 dark:bg-gray-900 dark:text-white`}
                            >
                                <ErrorIcon />
                                <div
                                    className="flex justify-center mx-2.5 my-1"
                                    role="status"
                                    aria-live="polite"
                                >
                                    Error al eliminar usuario
                                </div>
                            </div>
                        ),
                        { position: "bottom-right" }
                    );
                });
        }
    };

    return {
        users,
        isLoading,
        userForDelete,
        toggleStatus,
        deleteUser,
        cancelDeleteUser,
        confirmDeleteUser,
    };
}

export default function UsersTable() {
    const {
        users,
        isLoading,
        userForDelete,
        toggleStatus,
        deleteUser,
        cancelDeleteUser,
        confirmDeleteUser,
    } = useUsers();
    return (
        <>
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
                                            onClick={() =>
                                                toggleStatus(user.id)
                                            }
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
                                                onClick={() => deleteUser(user)}
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
            {userForDelete && (
                <div className="fixed inset-0 flex items-center justify-center h-screen  modal z-99999 p-4 sm:p-0">
                    <div
                        className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
                        onClick={cancelDeleteUser}
                    ></div>
                    <div className="relative w-full rounded-3xl bg-white  dark:bg-gray-900  max-w-[600px] p-5 lg:p-10">
                        <button
                            className="absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
                            onClick={cancelDeleteUser}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </button>
                        <div>
                            <div className="text-center">
                                <div className="relative flex items-center justify-center z-1 mb-7">
                                    <svg
                                        className="fill-error-50 dark:fill-error-500/15"
                                        width="90"
                                        height="90"
                                        viewBox="0 0 90 90"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M34.364 6.85053C38.6205 -2.28351 51.3795 -2.28351 55.636 6.85053C58.0129 11.951 63.5594 14.6722 68.9556 13.3853C78.6192 11.0807 86.5743 21.2433 82.2185 30.3287C79.7862 35.402 81.1561 41.5165 85.5082 45.0122C93.3019 51.2725 90.4628 63.9451 80.7747 66.1403C75.3648 67.3661 71.5265 72.2695 71.5572 77.9156C71.6123 88.0265 60.1169 93.6664 52.3918 87.3184C48.0781 83.7737 41.9219 83.7737 37.6082 87.3184C29.8831 93.6664 18.3877 88.0266 18.4428 77.9156C18.4735 72.2695 14.6352 67.3661 9.22531 66.1403C-0.462787 63.9451 -3.30193 51.2725 4.49185 45.0122C8.84391 41.5165 10.2138 35.402 7.78151 30.3287C3.42572 21.2433 11.3808 11.0807 21.0444 13.3853C26.4406 14.6722 31.9871 11.951 34.364 6.85053Z"
                                            fill=""
                                            fillOpacity=""
                                        ></path>
                                    </svg>
                                    <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                                        <svg
                                            className="fill-error-600 dark:fill-error-500"
                                            width="38"
                                            height="38"
                                            viewBox="0 0 38 38"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M9.62684 11.7496C9.04105 11.1638 9.04105 10.2141 9.62684 9.6283C10.2126 9.04252 11.1624 9.04252 11.7482 9.6283L18.9985 16.8786L26.2485 9.62851C26.8343 9.04273 27.7841 9.04273 28.3699 9.62851C28.9556 10.2143 28.9556 11.164 28.3699 11.7498L21.1198 18.9999L28.3699 26.25C28.9556 26.8358 28.9556 27.7855 28.3699 28.3713C27.7841 28.9571 26.8343 28.9571 26.2485 28.3713L18.9985 21.1212L11.7482 28.3715C11.1624 28.9573 10.2126 28.9573 9.62684 28.3715C9.04105 27.7857 9.04105 26.836 9.62684 26.2502L16.8771 18.9999L9.62684 11.7496Z"
                                                fill=""
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
                                    Eliminar Usuario
                                </h4>
                                <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                    ¿Está seguro de eliminar al usuario{" "}
                                    <strong>{userForDelete.email}</strong>?
                                </p>
                                <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                    La eliminación del usuario será permanente.
                                </p>
                                <div className="flex items-center justify-center w-full gap-3 mt-7">
                                    <button
                                        className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/3 dark:hover:text-gray-300"
                                        onClick={cancelDeleteUser}
                                    >
                                        No, Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-error-500 shadow-theme-xs hover:bg-error-600 sm:w-auto"
                                        onClick={confirmDeleteUser}
                                    >
                                        Si, Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
