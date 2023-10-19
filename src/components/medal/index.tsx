import styled from "styled-components";
import useGetMedal from "../../hooks/useGetMedal";
import MedalCard from "./MedalCard";

interface MedalType {
  title: any;
  content?: string;
  image: string;
}

export default function Medal() {
  const { medalData } = useGetMedal();

  return (
    <MedalContainer>
      {medalData.map(
        (medal: {
          medal_id: string;
          image: string;
          title: string;
          subtitle: string;
          content: string;
          requirement: string;
          isAchieved: boolean;
        }) => {
          return <MedalCard key={medal.title} medal={medal} />;
        },
      )}
    </MedalContainer>
  );
}

const MedalContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 10rem;
`;
