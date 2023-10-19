import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TurtledMainLogoIc } from "../assets";
import { IMG } from "../core/img";
import Loading from "./Loading";

interface guestBookType {
  from: string;
  letter: string;
  turtle: number;
}

export default function GuestBook() {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const db = getFirestore();
    const guestBookRef = collection(db, "guestBook");

    const getData = onSnapshot(guestBookRef, (snapshot: any) => {
      const guestBookDatas: any[] = [];
      snapshot.forEach((doc: any) => {
        guestBookDatas.push({ id: doc.id, ...doc.data() });
      });

      setData(guestBookDatas);
    });
    setIsLoading(false);
    return () => getData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <GuestBookContainer>
      <TurtledMainLogoIc />
      <Link to="/guest-book/send">
        <GoTo>방명록 작성하기</GoTo>
      </Link>
      <GuestBookWrapper>
        {data?.map(({ from, letter, turtle }: guestBookType, index: number) => (
          <Card key={index}>
            <Turtle src={IMG[turtle]} alt="거북 사진" />

            <From>{from}</From>
          </Card>
        ))}
      </GuestBookWrapper>
    </GuestBookContainer>
  );
}

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Turtle = styled.img`
  width: 100%;
`;

const GuestBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 5rem;
`;

const GuestBookWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const From = styled.h1`
  /* border: 1px solid black; */
  border-radius: 5rem;
  padding: 0.5rem 1rem;
  min-width: max-content;
  /* white-space: nowrap; */
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
  ${({ theme }) => theme.fonts.sub};
`;

const GoTo = styled.h1`
  margin-top: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.green};
  border-radius: 5rem;
  padding: 0.5rem 1rem;
  min-width: max-content;
  /* white-space: nowrap; */
  color: ${({ theme }) => theme.colors.green};
  background-color: white;
  ${({ theme }) => theme.fonts.title};
`;
