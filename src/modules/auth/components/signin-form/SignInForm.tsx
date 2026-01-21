import { useState } from "react";
import css from "./SignInForm.module.css";
import { useFormik, type FormikHelpers } from "formik";
import Eye from "@/assets/icons/eye-icon.svg?react";
import EyeOff from "@/assets/icons/eye-icon-crossed.svg?react";
import { Input } from "@/shared/ui/input/Input";
import { Button } from "@/shared/ui/button/Button";
import { loginValidationSchema } from "./validation";

export interface SignInValues {
  email: string;
  password: string;
}

const defaultInitialValues: SignInValues = { email: "", password: "" };

export interface SignInFormProps {
  onSubmit: (
    values: SignInValues,
    helpers: FormikHelpers<SignInValues>,
  ) => void;
  initialValues: SignInValues;
  disabled: boolean;
}

export const SignInForm = ({
  onSubmit,
  initialValues = defaultInitialValues,
  disabled = false,
}: SignInFormProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: { ...defaultInitialValues, ...initialValues },
    onSubmit,
    validationSchema: loginValidationSchema,
  });

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className={css.fieldsContainer}>
        <Input
          value={values.email}
          error={errors.email}
          name="email"
          onChange={handleChange("email")}
          placeholder="Email"
          required
          disabled={disabled}
        />

        <Input
          value={values.password}
          error={errors.password}
          name="password"
          onChange={handleChange("password")}
          onIconClick={() => setVisiblePassword((prev) => !prev)}
          type={visiblePassword ? "text" : "password"}
          iconRight={
            visiblePassword ? (
              <EyeOff width={18} height={18} />
            ) : (
              <Eye width={18} height={18} />
            )
          }
          placeholder="Password"
          required
          disabled={disabled}
        />
      </div>

      <Button
        className={css.button}
        type="submit"
        variant="dark"
        size="medium"
        bordered
        disabled={disabled}
      >
        Sign in
      </Button>
    </form>
  );
};
