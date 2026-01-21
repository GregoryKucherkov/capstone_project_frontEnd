import { useFormik } from "formik";
import Eye from "@/assets/icons/eye-icon.svg?react";
import EyeOff from "@/assets/icons/eye-icon-crossed.svg?react";
import css from "./SignUpForm.module.css";
import { useState } from "react";
import { registerValidationSchema } from "@/modules/auth/components/signup-form/validation";
import { Input } from "@/shared/ui/input/Input";
import { Button } from "@/shared/ui/button/Button";
import { type FormikHelpers } from "formik";

export interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

const defaultInitialValues: SignUpValues = {
  name: "",
  email: "",
  password: "",
};

export interface SignUpFormProps {
  onSubmit: (
    values: SignUpValues,
    helpers: FormikHelpers<SignUpValues>,
  ) => void;
  initialValues?: SignUpValues;
  disabled: boolean;
}

const SignUpForm = ({
  onSubmit,
  initialValues = defaultInitialValues,
  disabled = false,
}: SignUpFormProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: { ...defaultInitialValues, ...initialValues },
    onSubmit,
    validationSchema: registerValidationSchema,
  });

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className={css.fieldsContainer}>
        <Input
          value={values.name}
          error={errors.name}
          name="name"
          onChange={handleChange("name")}
          placeholder="Name"
          required
          disabled={disabled}
        />

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
        Create
      </Button>
    </form>
  );
};

export { SignUpForm };
