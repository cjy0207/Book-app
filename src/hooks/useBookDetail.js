import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchBookDetail = ({ id }) => {
  return api.get(`/volumes/${id}`, {
    params: {
      key: process.env.REACT_APP_API_KEY, 
    },
  });
};

export const useBookDetailQuery = ({ id }) => {
  return useQuery({
    queryKey: ["book-detail", { id }],
    queryFn: () => fetchBookDetail({ id }),
    enabled: !!id, 
    select: (results) => results.data, 
  });
};
