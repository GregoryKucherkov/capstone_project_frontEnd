import { useLogin } from "@/modules/auth/hooks/useLogin";
import css from "./SignInModal.module.css";
import {
  SignInForm,
  type SignInValues,
} from "@/modules/auth/components/signin-form/SignInForm";
import { type FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/shared/constants/messages";
import { Typography } from "@/shared/ui/typography/Typography";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface SignInModalProps {
  onRedirectToSignUp: () => void;
  onSuccess: () => void;
}

export const SignInModal = ({
  onRedirectToSignUp,
  onSuccess,
}: SignInModalProps) => {
  const [searchParams] = useSearchParams();
  const { mutateAsync: signIn, isPending } = useLogin();
  const navigate = useNavigate();

  const disabledForm = isPending;

  const handleSubmit = async (
    values: SignInValues,
    formActions: FormikHelpers<SignInValues>,
  ) => {
    try {
      await signIn(values);
      formActions.resetForm();
      const redirectTo = searchParams.get("redirect") || "/";
      onSuccess();

      navigate(redirectTo, { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    }
  };

  return (
    <div className={css.container}>
      <Typography className={css.title} variant="h2">
        Sign in
      </Typography>

      <SignInForm
        onSubmit={handleSubmit}
        initialValues={{ email: "", password: "" }}
        disabled={disabledForm}
      />

      <div className={css.text}>
        <span>Don't have an account?</span>
        <button
          className={css.button}
          type="button"
          onClick={onRedirectToSignUp}
        >
          Create an account
        </button>
      </div>
    </div>
  );
};
