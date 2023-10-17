import { useEffect } from "react";
import Calendar from "../components/calendar";
import { FOOTER_CATEGORY } from "../core/footerCategory";
import useFooterMove from "../hooks/useFooterMove";

export default function CalendarPage() {
  const { handleMoveToPage } = useFooterMove();
  useEffect(() => {
    handleMoveToPage(FOOTER_CATEGORY.calendar);
  }, []);

  return <Calendar />;
}
