import {
  FooterCalendarActiveIc,
  FooterCalendarIc,
  FooterPhotoActiveIc,
  FooterPhotoIc,
  FooterProfileActiveIc,
  FooterProfileIc,
  FooterStrechingActiveIc,
  FooterStrechingIc,
} from "../../assets";
import { FOOTER_CATEGORY } from "../../core/footerCategory";

interface FooterIconsProps {
  category: string;
  isMoved: boolean;
}

export default function FooterIcons(props: FooterIconsProps) {
  const { category, isMoved } = props;

  switch (category) {
    case FOOTER_CATEGORY.streching:
      return isMoved ? <FooterStrechingActiveIc /> : <FooterStrechingIc />;
    case FOOTER_CATEGORY.calendar:
      return isMoved ? <FooterCalendarActiveIc /> : <FooterCalendarIc />;
    case FOOTER_CATEGORY.photo:
      return isMoved ? <FooterPhotoActiveIc /> : <FooterPhotoIc />;
    case FOOTER_CATEGORY.profile:
      return isMoved ? <FooterProfileActiveIc /> : <FooterProfileIc />;
    default:
      return;
  }
}
