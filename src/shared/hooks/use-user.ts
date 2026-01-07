// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "@/shared/api/auth-api";


// export const useUser = () => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser,
//     retry: false, // Don't retry if the user isn't logged in (401)
//     staleTime: Infinity, // The user doesn't change unless they logout/login
//   });

//   return {
//     user: data,
//     isLoggedIn: !!data, // If data exists, they are logged in
//     isLoading,
//     isError
//   };
// };