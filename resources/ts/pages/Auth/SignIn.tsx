import PageMeta from "@components/common/PageMeta";
import AuthLayout from "./AuthLayout";
import SignInForm from "@components/auth/SignInForm";
import { useAuth } from "@context/AuthContext";
import { Navigate } from "react-router";

export default function SignIn() {
    const { auth } = useAuth();

    if (auth) {
        return <Navigate to="/panel" replace />;
    }

    return (
        <>
            <PageMeta title="Inicio de Sesión | ERP Plantilla" />
            <AuthLayout>
                <SignInForm />
            </AuthLayout>
        </>
    );
}
