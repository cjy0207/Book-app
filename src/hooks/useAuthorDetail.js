import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchAuthorDetail = async (author) => {
  const response = await api.get("/volumes", {
    params: {
      q: `author:${author}`, 
      maxResults: 20,
      key: process.env.REACT_APP_API_KEY,
    },
  });
  return response.data;
};

export const useAuthorDetailQuery = (author) => {
  return useQuery({
    queryKey: ["author-books", author],
    queryFn: () => fetchAuthorDetail(author),
    enabled: !!author, 
    select: (response) => response.items, 
  });
};
