import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchBook = ({ keyword }) => {
  return api.get("/volumes", {
    params: {
      q: keyword, 
      maxResults: 10, 
      key: process.env.REACT_APP_API_KEY, 
    },
  });
};

export const useSearchBookQuery = ({ keyword }) => {
  return useQuery({
    queryKey: ["book-search", { keyword }],
    queryFn: () => fetchSearchBook({ keyword }),
    enabled: !!keyword, 
    select: (results) => results.data,
  });
};
