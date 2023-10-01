import styled from "styled-components";
import useGetMedal from "../../hooks/useGetMedal";
import MedalCard from "./MedalCard";

export default function Medal() {
  const { medalData } = useGetMedal();

  return (
    <MedalContainer>
      {medalData.map((medal) => (
        <MedalCard key={medal.title} medal={medal} />
      ))}
    </MedalContainer>
  );
}

const MedalContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 10rem;
`;
