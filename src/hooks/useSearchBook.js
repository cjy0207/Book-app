import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchBook = ({ keyword, page, resultsPerPage }) => {
  return api.get("/volumes", {
    params: {
      q: keyword, 
      maxResults: resultsPerPage, // 한 페이지에 표시할 결과 수
      startIndex: (page - 1) * resultsPerPage, // 페이지에 따라 시작 인덱스 계산
      key: process.env.REACT_APP_API_KEY, 
    },
  });
};

export const useSearchBookQuery = ({ keyword, page = 1, resultsPerPage = 15 }) => {
  return useQuery({
    queryKey: ["book-search", { keyword, page, resultsPerPage }],
    queryFn: () => fetchSearchBook({ keyword, page, resultsPerPage }),
    enabled: !!keyword, 
    select: (results) => results.data,
  });
};
