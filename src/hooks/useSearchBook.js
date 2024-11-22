import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchBook = ({ keyword, page, resultsPerPage }) => {
  return api.get("/volumes", {
    params: {
      q: keyword, 
      maxResults: resultsPerPage, 
      startIndex: (page - 1) * resultsPerPage, 
      key: process.env.REACT_APP_API_KEY, 
    },
  });
};

export const useSearchBookQuery = ({ keyword, page = 1, resultsPerPage = 30 }) => {
  return useQuery({
    queryKey: ["book-search", { keyword, page, resultsPerPage }],
    queryFn: () => fetchSearchBook({ keyword, page, resultsPerPage }),
    enabled: !!keyword, 
    select: (results) => results.data,
  });
};
