// // src/modules/auth/login-form.tsx
// import { useQueryClient } from "@tanstack/react-query";
// import { loginUser } from "@/shared/api/auth-api";

// export const LoginForm = () => {
//   const queryClient = useQueryClient(); // 1. Get access to the cache

//   const handleSubmit = async (values) => {
//     try {
//       await loginUser(values); // 2. Call your actual API login
      
//       // 3. THIS IS THE KEY: Tell React Query the "user" data is now old/stale
//       // This triggers useUser() in your Header to re-run and show "isLoggedIn: true"
//       queryClient.invalidateQueries({ queryKey: ["user"] });
      
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>...</form>
//   );
// };