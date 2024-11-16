import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchBook = ({ keyword }) => {
  return api.get("/volumes", {
    params: {
      q: keyword, // 검색 키워드
      maxResults: 10, // 최대 결과 수
      key: process.env.REACT_APP_API_KEY, // API 키
    },
  });
};

export const useSearchBookQuery = ({ keyword }) => {
  return useQuery({
    queryKey: ["book-search", { keyword }],
    queryFn: () => fetchSearchBook({ keyword }),
    enabled: !!keyword, // 검색어가 있을 때만 실행
    select: (results) => results.data,
  });
};
