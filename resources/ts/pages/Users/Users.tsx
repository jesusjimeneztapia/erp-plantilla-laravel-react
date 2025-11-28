import ComponentCard from "@components/common/ComponentCard";
import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import UsersTable from "@components/tables/UsersTable/UsersTable";
import { useAuth } from "@context/AuthContext";
import { Navigate } from "react-router";

export default function Users() {
    const { auth } = useAuth();

    if (!auth) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <PageMeta title="Usuarios | ERP Plantilla" />
            <PageBreadcrumb pageTitle="Usuarios" />
            <div className="space-y-6">
                <ComponentCard title="Usuarios registrados">
                    <UsersTable />
                </ComponentCard>
            </div>
        </>
    );
}
