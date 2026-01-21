import { EMAIL_REGEX } from "@/shared/constants/regex";
import * as yup from "yup";

export const registerValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be at most 30 characters")
    .required("Name is required"),

  email: yup
    .string()
    .trim()
    .max(255, "Email must be at most 255 characters")
    .matches(EMAIL_REGEX, "Email must be a valid format like example@mail.com")
    .required("Email is required"),

  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must be at most 255 characters")
    .required("Password is required"),
});
