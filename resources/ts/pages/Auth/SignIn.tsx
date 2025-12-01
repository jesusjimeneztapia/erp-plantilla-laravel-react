import PageMeta from "@components/common/PageMeta";
import AuthLayout from "./AuthLayout";
import SignInForm from "@components/auth/SignInForm";
import { Navigate } from "react-router";
import { useAuthStore } from "@store/auth";

export default function SignIn() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/panel" replace />;
    }

    return (
        <>
            <PageMeta title="Iniciar Sesión | ERP Plantilla" />
            <AuthLayout>
                <SignInForm />
            </AuthLayout>
        </>
    );
}
