import { useQuery } from "react-query";
import { getLists } from "../api/chanllenge";

export default function useGetMedal() {
  const { data: medalData } = useQuery(["medalData"], getLists, {
    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
    },
  });

  return { medalData };
}
