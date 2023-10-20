import { addDoc, collection, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { IMG } from "../core/img";

export default function GuestBookWrite() {
  const [data, setData] = useState({ turtle: -1, letters: "", from: "" });

  const handleInputFrom = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, from: e.target.value });
  };

  const handleInputContent = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 100) {
      setData({ ...data, letters: e.target.value });
    }
  };

  function handleSelect(index: number) {
    setData({ ...data, turtle: index });
  }

  const navigate = useNavigate();
  // order테이블에 post
  async function send() {
    try {
      const db = getFirestore();

      const guestBookRef = collection(db, "guestBook");
      await addDoc(guestBookRef, data);

      if (confirm("전송되었습니다.")) {
        setData({ turtle: -1, letters: "", from: "" });
        navigate("/guest-book");
      } else {
        setData({ turtle: -1, letters: "", from: "" });
        navigate("/guest-book");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      setData({ turtle: -1, letters: "", from: "" });

      alert("전송에 실패했습니다.");
      navigate("/guest-book");
    }
  }

  return (
    <WriteWrapper>
      <ImgWrapper>
        {IMG.map((image, index) => (
          <Img src={image} onClick={() => handleSelect(index)} isClicked={index === data.turtle} />
        ))}
      </ImgWrapper>
      <Input type="text" placeholder="보내는 사람을 입력해주세요" onChange={handleInputFrom} />
      <TextAreaWrapper>
        <ContentArea
          placeholder="내용을 입력해 주세요."
          maxLength={100}
          value={data?.letters}
          onChange={handleInputContent}
        />
        <CountingLetterSection>
          <CountLetter>{`${data?.letters?.length ?? 0} / 100`}</CountLetter>
        </CountingLetterSection>
      </TextAreaWrapper>
      <Button type="button" onClick={send}>
        전송하기
      </Button>
    </WriteWrapper>
  );
}

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
  margin-top: 2rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.sub};
`;

const ImgWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  row-gap: 1rem;
  column-gap: 1rem;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  width: 100%;
  height: 24rem;

  overflow: scroll;

  margin-bottom: 2rem;
`;

const Img = styled.img<{ isClicked: boolean }>`
  width: 20%;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.green};

  &:active {
    background-color: ${({ theme }) => theme.colors.green};
  }
  cursor: pointer;
  background-color: ${({ theme, isClicked }) => isClicked && theme.colors.green};
`;

const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem;
`;
const Input = styled.input`
  ${({ theme }) => theme.fonts.sub}
  border: 1px solid ${({ theme }) => theme.colors.green};
  padding: 1rem;
  width: 100%;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

const TextAreaWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
`;

const CountingLetterSection = styled.section`
  position: absolute;
  right: 2.4rem;
  bottom: 2.4rem;
`;

const CountLetter = styled.span(
  ({ theme }) => theme.fonts.sub,
  css`
    color: ${({ theme }) => theme.colors.gray1};
  `,
);

const CommentBox = styled.p`
  position: absolute;
  right: 12%;
  margin-top: -4rem;

  ${({ theme }) => theme.fonts.sub};
  font-size: 1.5rem;
`;

const ContentArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 18rem;
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.green};

  ${({ theme }) => theme.fonts.sub};

  &::placeholder {
    ${({ theme }) => theme.fonts.sub};
  }

  &:focus {
    ${({ theme }) => theme.fonts.sub};
    outline: 1px solid ${({ theme }) => theme.colors.gray1};
  }
`;
