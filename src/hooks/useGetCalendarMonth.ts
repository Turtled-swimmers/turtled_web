import { useQuery } from "react-query";
import { getMonthData } from "../api/chanllenge";

export default function useGetCalendarMonth(date: string) {
  const { data: monthData } = useQuery(["monthData"], () => getMonthData(date), {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { monthData };
}
