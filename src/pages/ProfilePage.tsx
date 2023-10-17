import { useEffect } from "react";
import Footer from "../components/common/Footer";
import ProfileHeader from "../components/common/ProfileHeader";
import Profile from "../components/profile";
import { FOOTER_CATEGORY } from "../core/footerCategory";
import useFooterMove from "../hooks/useFooterMove";

export default function ProfilePage() {
  const { handleMoveToPage } = useFooterMove();
  useEffect(() => {
    handleMoveToPage(FOOTER_CATEGORY.profile);
  }, []);

  return (
    <>
      <ProfileHeader />
      <Profile />
      <Footer />
    </>
  );
}
