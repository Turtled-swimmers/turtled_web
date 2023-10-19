import { Link } from "react-router-dom";
import styled from "styled-components";
import { Phone1, Phone2, Phone3, Phone4, TurtleIc, TurtledMainLogoIc, TurtledPersonIc } from "../assets";
import group from "../assets/icon/groupImage.png";

export default function Landing() {
  return (
    <>
      <LandingWrapper>
        <Header>
          <Link to="/home">
            <TurtledMainLogoIc />
          </Link>
          <ButtonWrapper>
            <Link to="login">
              <Button type="button">로그인</Button>
            </Link>
            <Link to="signup">
              <Button type="button">회원가입</Button>
            </Link>
          </ButtonWrapper>
        </Header>
        <Title>
          당신의 거북목! <br />
          제가 고쳐드릴게요
        </Title>
        <Sub>거북목은 이제 과거다!</Sub>
        <Center>
          <TurtledPersonIcon />
          <SubCaption>거북목 조심하라는 글을 본 나.jpg</SubCaption>
          <CenterTitle>
            온 세상 거북목들을
            <br />
            위한 최고의 서비스!
          </CenterTitle>
        </Center>
      </LandingWrapper>
      <Circle />
      <Rectangle />
      <Contents>
        <Center>
          <Phone1Image />
        </Center>
        <Center>
          <TurtledIcon />
          <Title>Why Turtled?</Title>
        </Center>
        <LandingWrapper>
          <SubTitle>
            스트레칭?
            <br />
            절대 까먹지 않도록!
          </SubTitle>
          <Title>
            스트레칭
            <br />
            스탑워치
          </Title>
          <Body>
            설정한 시간 간격마다,
            <br />
            스트레칭 리마인드 알림을 드릴게요.
          </Body>
          <Center>
            <Phone2Image />
          </Center>
          <SubTitle>
            스트레칭도
            <br />
            재밌고 성취감있게!
          </SubTitle>
          <Title>
            스트레칭
            <br />
            달성기록
          </Title>
          <Body>
            월간/일간 스트레칭 달성기록을
            <br />
            한눈에 확인할 수 있어요.
          </Body>
          <Body>
            주어진 달성 미션을 수행하고, <br />
            메달도 획득해보세요!
          </Body>
          <Center>
            <Phone3Image />
          </Center>
          <SubTitle>
            매일 개선되는 거북목을
            <br />
            수치로 확인하세요!
          </SubTitle>
          <Title>
            거북목
            <br />
            측정
          </Title>
          <Body>
            거북목 영상을 직접 촬영하여, <br />
            매일 개선되는 거북목 지수를 수치로 <br />
            확인해보세요.
          </Body>
          <Center>
            <Phone4Image />
          </Center>
          <Center>
            <CenterTitle>
              Turtled와
              <br />
              함께라면
              <br />
              거북목 탈출 성공!
            </CenterTitle>
            <Link to="/signup">
              <SignupButton>지금 가입하기</SignupButton>
            </Link>
            <Image src={group} alt="그룹 이미지" />
          </Center>
        </LandingWrapper>
      </Contents>
    </>
  );
}

const Image = styled.img`
  width: 40rem;

  margin: 10rem 0;
`;

const TurtledIcon = styled(TurtleIc)`
  width: 20rem;
  margin-top: -55rem;
  margin-bottom: -45rem;
`;

const SubTitle = styled.h1`
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-top: 5rem;
  margin-bottom: 1rem;
`;

const Rectangle = styled.div`
  background: linear-gradient(
    180deg,
    #98cdb3 0%,
    rgba(152, 205, 179, 0.93) 50.52%,
    rgba(152, 205, 179, 0.92) 51.04%,
    rgba(152, 205, 179, 0) 100%
  );
  width: 100%;
  height: 216.1111rem;
  margin-top: -50rem;
`;

const Contents = styled.div`
  margin-top: -295rem;
`;

const Circle = styled.div`
  width: 100%;
  height: 105rem;
  flex-shrink: 0;
  border-radius: 100rem;
  background: #98cdb3;

  margin-top: 20rem;
`;

const Phone1Image = styled(Phone1)`
  width: 130%;
  margin-top: 5%;
`;

const Phone2Image = styled(Phone2)`
  width: 100%;

  margin-top: -10%;
  margin-bottom: -5%;
`;

const Phone3Image = styled(Phone3)`
  width: 100%;

  margin-top: -3%;
`;

const Phone4Image = styled(Phone4)`
  width: 100%;

  margin-top: -10%;
  margin-bottom: -5%;
`;

const TurtledPersonIcon = styled(TurtledPersonIc)`
  width: 100%;
  margin-top: 3.3%;
  height: 80rem;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 10%;
`;

const SubCaption = styled.p`
  color: #676767;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;

  margin-bottom: 8.3rem;
`;

const Body = styled.p`
  color: #676767;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  margin-top: 1rem;
`;

const Sub = styled.p`
  font-family: Pretendard;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
`;

const LandingWrapper = styled.div`
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 4.2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 108%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  /* width: 130px; */
`;

const Header = styled.header`
  padding: 2rem 0rem;
  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;

  border-radius: 5rem;

  margin: 0 0.5rem;

  color: ${({ theme }) => theme.colors.green};
  border: 1px solid ${({ theme }) => theme.colors.green};
  ${({ theme }) => theme.fonts.caption}
`;

const CenterTitle = styled(Title)`
  text-align: center;
`;

const SignupButton = styled(Button)`
  text-align: center;
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 180%;

  background-color: ${({ theme }) => theme.colors.green};
  color: white;

  padding: 1rem 3rem;

  margin-top: 5rem;
`;
