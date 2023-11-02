import styled from "styled-components";

interface MedalCardProps {
  medal: {
    medal_id: string;
    image: string;
    title: string;
    subtitle: string;
    content: string;
    requirement: string;
    isAchieved: boolean;
  };
}

export default function MedalCard({ medal }: MedalCardProps) {
  return (
    <MedalCardWrapper>
      <Image src={medal.image} alt="메달 사진" />
      <Left>
        <Title>{medal.title}</Title>
        <Content>{medal.content}</Content>
      </Left>
    </MedalCardWrapper>
  );
}

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.p`
  display: flex;
  flex-wrap: wrap;
  ${({ theme }) => theme.fonts.content}
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.sub}
`;

const Image = styled.img`
  width: 30%;
`;

const MedalCardWrapper = styled.article`
  overflow: scroll;
  display: flex;

  padding: 1rem 0;
  margin: 1rem;
  align-items: center;
  width: 85%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};
`;
