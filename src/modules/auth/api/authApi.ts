import type { SignUpValues } from "@/modules/auth/components/signup-form/SignUpForm";
import { baseFetch } from "@/shared/api/baseApi";



export const registerUserApi = (values: SignUpValues) => {
    return baseFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
    })
}