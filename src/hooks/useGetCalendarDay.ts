import { useQuery } from "react-query";
import { getDaysData } from "../api/chanllenge";

export default function useGetCalendarDay(clickedDay: string | undefined) {
  const { data: dayData } = useQuery(["dayData"], () => getDaysData(clickedDay ? clickedDay : ""), {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { dayData };
}
