import { useQuery } from "react-query";
import { getMedal } from "../api/medal";

export default function useGetMedal() {
  const { data: medalData } = useQuery(["medalData"], getMedal, {
    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
    },
  });

  return { medalData };
}
