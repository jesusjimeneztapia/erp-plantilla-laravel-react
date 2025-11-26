import PageMeta from "@components/common/PageMeta";
import AuthLayout from "./AuthLayout";
import SignUpForm from "@components/auth/SignUpForm";
import { useAuth } from "@context/AuthContext";
import { Navigate } from "react-router";

export default function SignUp() {
    const { auth } = useAuth();

    if (auth) {
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
