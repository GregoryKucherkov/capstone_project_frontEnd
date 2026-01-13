import type { SignInValues } from "@/modules/auth/components/signin-form/SignInForm";
import type { SignUpValues } from "@/modules/auth/components/signup-form/SignUpForm";
import { baseFetch } from "@/shared/api/baseApi";
import type { AuthResponse, User } from "@/shared/types/api";


export const registerUserApi = (values: SignUpValues): Promise<AuthResponse> => {
    return baseFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password
        }),
    })
}


export const loginUserApi = async (values: SignInValues): Promise<AuthResponse> => {
  const body = new URLSearchParams();

  body.append("username", values.email); 
  body.append("password", values.password);

  return baseFetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
};


export const logoutUserApi = async (refreshToken: string): Promise<{ message: string }> => {

    return baseFetch(`/auth/logout?refresh_token=${encodeURIComponent(refreshToken)}`, {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
    })
}



export const getCurrentUser = async (): Promise<User | null> => {
  try {
    return await baseFetch("/users/me");
  } catch (error: unknown) {

    if (
      error instanceof Error && 
      "status" in error && 
      error.status === 401
    ) {
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken");
      return null;
    }

    throw error;
  }
};