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
  const medalList: MedalType[] = [];
  medalList.push({ ...medalData });

  return (
    <MedalContainer>
      {medalList.map((medal: { title: any; content?: string; image: string }) => {
        return <MedalCard key={medal.title} medal={medal} />;
      })}
    </MedalContainer>
  );
}

const MedalContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 10rem;
`;
