import PageMeta from "@components/common/PageMeta";
import AuthLayout from "./AuthLayout";
import SignUpForm from "@components/auth/SignUpForm";
import { Navigate } from "react-router";
import { useAuthStore } from "@store/auth";

export default function SignUp() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/panel" replace />;
    }

    return (
        <>
            <PageMeta title="Registrarse | ERP Plantilla" />
            <AuthLayout>
                <SignUpForm />
            </AuthLayout>
        </>
    );
}
