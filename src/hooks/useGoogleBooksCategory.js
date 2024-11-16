import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchBooksByCategory = async (category) => {
  const response = await api.get("/volumes", {
    params: {
      q: `subject:${category}`, 
      key: process.env.REACT_APP_API_KEY,
      maxResults: 15,
      orderBy: "relevance", 
    },
  });
  return response.data;
};

export const useGoogleBooksCategory = (category) => {
  return useQuery({
    queryKey: ["google-books-category", category],
    queryFn: () => fetchBooksByCategory(category),
    enabled: !!category,
    select: (response) => response.items,
  });
};