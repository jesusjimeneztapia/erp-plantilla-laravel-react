import PageMeta from "@components/common/PageMeta";
import AuthLayout from "./AuthLayout";
import SignInForm from "@components/auth/SignInForm";

export default function SignIn() {
    return (
        <>
            <PageMeta title="Inicio de Sesión | ERP Plantilla" />
            <AuthLayout>
                <SignInForm />
            </AuthLayout>
        </>
    );
}
