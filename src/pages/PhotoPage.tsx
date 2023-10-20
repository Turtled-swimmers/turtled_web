import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { uploadPhoto } from "../api/photo";
import { HiTurtleIc } from "../assets";
import Footer from "../components/common/Footer";
import Modal from "../components/common/Modal";
import PhotoHeader from "../components/common/PhotoHeader";
import { FOOTER_CATEGORY } from "../core/footerCategory";
import useFooterMove from "../hooks/useFooterMove";
import Loading from "./Loading";

export default function PhotoPage() {
  const { handleMoveToPage } = useFooterMove();
  useEffect(() => {
    handleMoveToPage(FOOTER_CATEGORY.photo);
  }, []);

  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);

  function handleModal() {
    setIsShow((is) => !is);
  }

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState({ percentage: 0, image: "" });
  const { mutate: uploadFile, isLoading } = useMutation(() => uploadPhoto(file), {
    onSuccess: (response) => {
      setIsShowResult(true);
      setIsShow(false);
      setResult(response);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length === 0) {
    } else {
      if (e.target.files) {
        const file = e.target.files[0];
        if (e.target.files[0]) {
          setFile(file);
        }
      }
    }
  }

  if (isLoading) return <Loading />;

  return (
    <Page>
      {isShowResult && (
        <Modal handleClickSingleButton={() => setIsShowResult(false)}>
          <ModalWrapper>
            <ResultImage src={result.image} />
            <ModalTitle>당신의 거북목 지수는 {result.percentage}%입니다!</ModalTitle>
            <ModalSub>Turtled와 함께 거북목을 극복해보아요!</ModalSub>
            <Button type="button" onClick={() => navigate("/home")}>
              홈으로 이동
            </Button>
          </ModalWrapper>
        </Modal>
      )}
      {isShow && (
        <Modal handleClickSingleButton={handleModal}>
          <ModalWrapper>
            <ModalTitle>이렇게 촬영해주세요!</ModalTitle>
            <ModalSub>(1) 자연스러운 옆모습을 영상 촬영(3초)해주세요!</ModalSub>
            <ModalSub>
              (2) 무엇인가를 보고 있는 모습이라면
              <br />더 정확하게 측정가능하답니다!
            </ModalSub>

            <Input type="file" onChange={handleFileChange} />

            <Button type="button" onClick={() => uploadFile()}>
              업로드하기
            </Button>
          </ModalWrapper>
        </Modal>
      )}
      <PhotoHeader />
      <ContentWrapper>
        <Title>측정</Title>
        <Center>
          <TurtleIcon />
          <Button onClick={handleModal}>측정하기</Button>
        </Center>
      </ContentWrapper>
      <Footer />
    </Page>
  );
}

const ResultImage = styled.img`
  width: 80%;
`;

const Page = styled.div`
  padding-bottom: 15rem;
  overflow: scroll;
`;

const RealImg = styled.img`
  width: 20%;
  border-radius: 1rem;
  margin-right: 2rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.article`
  width: 100%;
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  background-color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.sub}
`;

const Input = styled.input`
  margin-top: 2rem;
`;

const Button = styled.button`
  display: flex;
  height: 4.8rem;
  padding: 1.2rem 8rem;
  margin-top: 3rem;

  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  align-self: stretch;
  border-radius: 1rem;
  border: 3px solid ${({ theme }) => theme.colors.green};
  background: ${({ theme }) => theme.colors.green};
  box-shadow: 0px 3px 3px 0px rgba(95, 88, 88, 0.2);

  color: white;
  ${({ theme }) => theme.fonts.sub};
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TurtleIcon = styled(HiTurtleIc)`
  width: 30rem;
  height: 30rem;
  margin-bottom: -10rem;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.title}
  margin-top: 3rem;
`;

const ContentWrapper = styled.div`
  padding: 0 3rem;
`;

const ModalWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h1`
  margin-bottom: 2rem;
  ${({ theme }) => theme.fonts.title};
`;

const ModalSub = styled.p`
  margin-bottom: 1rem;
  ${({ theme }) => theme.fonts.sub};
`;
