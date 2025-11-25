import PageMeta from "@components/common/PageMeta";
import AuthLayout from "./AuthLayout";
import SignUpForm from "@components/auth/SignUpForm";

export default function SignUp() {
    return (
        <>
            <PageMeta title="Registrarse | ERP Plantilla" />
            <AuthLayout>
                <SignUpForm />
            </AuthLayout>
        </>
    );
}
