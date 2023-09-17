import { useRecoilState } from "recoil";
import styled from "styled-components";
import { footerCategory } from "../../atom/footerCategory";
import useFooterMove from "../../hooks/useFooterMove";
import FooterIcons from "./FooterIcons";

export default function Footer() {
  const [footerList, setFooterList] = useRecoilState<FooterType[]>(footerCategory);
  const { handleMoveToPage } = useFooterMove();

  return (
    <FooterWrapper>
      {footerList.map(({ id, category, isMoved }) => (
        <Icon key={id} onClick={() => handleMoveToPage(category)}>
          <FooterIcons category={category} isMoved={isMoved} />
        </Icon>
      ))}
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;

  display: flex;
  width: 100%;
  height: 8.8rem;
  padding: 2.6rem 2.8rem 3.2rem 2.8rem;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.4rem;
  flex-shrink: 0;

  background: var(--neutral-light-lightest, #fff);
  box-shadow: 0px -4px 4px 0px rgba(95, 88, 88, 0.1);
`;

const Icon = styled.i`
  display: flex;
  justify-content: center;
  width: 3.6rem;
`;
