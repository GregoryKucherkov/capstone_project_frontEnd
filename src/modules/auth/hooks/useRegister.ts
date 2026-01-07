import { registerUserApi } from "@/modules/auth/api/authApi";
import { useMutation } from "@tanstack/react-query";


export const useRegister = () => {
  return useMutation({
    mutationFn: registerUserApi,
  });
};