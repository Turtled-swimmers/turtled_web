import styled from "styled-components";

interface MedalCardProps {
  medal: { title: string; content?: string; image: string };
}

export default function MedalCard({ medal }: MedalCardProps) {
  return (
    <MedalCardWrapper>
      <Left>
        <Image src={medal.image} alt="메달 사진" />
        <Title>{medal.title}</Title>
      </Left>
      <Content>{medal.content}</Content>
    </MedalCardWrapper>
  );
}

const Left = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.p`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  ${({ theme }) => theme.fonts.content}
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.sub}
`;

const Image = styled.img`
  width: 85%;
`;

const MedalCardWrapper = styled.article`
  overflow: scroll;
  display: flex;

  padding: 1rem 0;
  margin: 1rem;
  justify-content: space-between;
  align-items: center;
  width: 85%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};
`;
