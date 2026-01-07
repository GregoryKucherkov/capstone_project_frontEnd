import { baseFetch } from "@/shared/api/baseApi";


export const getExercises = async (search?: string) => {

    const queryPath = search ? `?search=${encodeURIComponent(search)}` : "";

  return baseFetch(`/exercises${queryPath}`);
};

// export const getExercises = async (filterKey: string, filterValue: string, keyword?: string) => {
//   const params = new URLSearchParams();
  
//   // 1. Add the required filter (e.g., muscles=abs)
//   params.append(filterKey, filterValue);
  
//   // 2. Add the search keyword if it exists
//   if (keyword) {
//     params.append("keyword", keyword);
//   }

//   // Use your baseFetch exactly as you wrote it
//   return baseFetch(`/exercises?${params.toString()}`);
// };