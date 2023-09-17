import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { footerCategory } from "../atom/footerCategory";
import { FOOTER_CATEGORY } from "../core/footerCategory";

export default function useFooterMove() {
  const [footerList, setFooterList] = useRecoilState<FooterType[]>(footerCategory);
  const navigate = useNavigate();

  function handleMoveToPage(category: string) {
    setFooterList(
      footerList.map((list) => (list.category === category ? { ...list, isMoved: true } : { ...list, isMoved: false })),
    );
    switch (category) {
      case FOOTER_CATEGORY.streching:
        navigate("/");
        break;
      case FOOTER_CATEGORY.calendar:
        navigate("/calendar");
        break;
      case FOOTER_CATEGORY.medal:
        navigate("/medal");
        break;
      case FOOTER_CATEGORY.profile:
        navigate("/profile");
        break;
      default:
        break;
    }
  }

  function handleChangeActive(category: string) {
    setFooterList(
      footerList.map((list) => (list.category === category ? { ...list, isMoved: true } : { ...list, isMoved: false })),
    );
  }
  return { handleMoveToPage, handleChangeActive };
}
