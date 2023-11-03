import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { changeMedal, checkMedal } from "../../api/medal";
import { token } from "../../atom/common/token";

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
  const [deviceToken, setDeviceToken] = useRecoilState(token);

  const { mutate: changingMedal } = useMutation(() => changeMedal(medal.medal_id, deviceToken), {
    onSuccess: (res) => {
      alert("거북이가 변경되었습니다. 다시 스트레칭을 하러 가보아요!");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: checkingMedal } = useMutation(() => checkMedal(medal.medal_id, deviceToken), {
    onSuccess: (res) => {
      console.log(res);
      changingMedal();
      // if (!res.is_achieved) {
      // } else {
      //   alert(`스트레칭을 더 열심히 하면 ${medal.title}을 얻을 수 있을 거에요!`);
      // }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handleDownload() {
    checkingMedal();
  }

  return (
    <MedalCardWrapper>
      <Image src={medal.image} alt="메달 사진" />
      <Left>
        <Title>{medal.title}</Title>
        <Content>{medal.content}</Content>
      </Left>
      <Button onClick={handleDownload}>다운로드</Button>
    </MedalCardWrapper>
  );
}

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.green};
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  margin-left: 1rem;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  width: 45%;
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
  /* overflow: scroll; */
  display: flex;

  padding: 1rem 0;
  margin: 1rem;
  align-items: center;
  width: 85%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};
`;
