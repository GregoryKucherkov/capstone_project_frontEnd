import { useRegister } from "@/modules/auth/hooks/useRegister";
import css from "./SignUpModal.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { SignUpForm, type SignUpValues } from "@/modules/auth/components/signup-form/SignUpForm";
import { type FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/shared/constants/messages";
import type { ApiError } from "@/shared/types/api";

interface SignUpModalProps {
  onRedirectToSignIn: () => void;
}

export const SignUpModal = ({ onRedirectToSignIn }: SignUpModalProps) => {
    const { mutateAsync: register, isPending } = useRegister();

    const disabledForm = isPending;

    const handleSubmit = async (values: SignUpValues, formActions: FormikHelpers<SignUpValues>) => {
        try {
            await register(values);

            toast.success("Registration successful!");
            formActions.resetForm();
        } catch(err) {
            const error = err as ApiError;

            toast.error(error.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
        }
    }

    return (
        <div className={css.container}>
            <Typography className={css.title} variant="h2">
                Sign up
            </Typography>

            <SignUpForm onSubmit={handleSubmit} disabled={disabledForm} />

            <div className={css.text}>
                <span>I already have an account?</span>
                <button
                className={css.button}
                type="button"
                onClick={onRedirectToSignIn}
                >
                Sign in
                </button>
            </div>
        </div>
    )
}