import { PropsWithChildren } from "react";
import styled from "styled-components";

export default function Header(props: PropsWithChildren) {
  const { children } = props;

  return <HeaderBox>{children}</HeaderBox>;
}

const HeaderBox = styled.header`
  display: flex;
  width: 100%;
  height: 5.6rem;
  padding: 1.95rem 0rem 1.25rem 0rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  background: #fff;
  box-shadow: 0px 4px 3px 0px rgba(95, 88, 88, 0.1);

  ${({ theme }) => theme.fonts.title}
`;
