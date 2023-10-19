import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiTurtleIc } from "../assets";
import img1 from "../assets/image/img1.png";
import img2 from "../assets/image/img2.jpeg";
import Footer from "../components/common/Footer";
import Modal from "../components/common/Modal";
import PhotoHeader from "../components/common/PhotoHeader";
import { FOOTER_CATEGORY } from "../core/footerCategory";
import useFooterMove from "../hooks/useFooterMove";

export default function PhotoPage() {
  const { handleMoveToPage } = useFooterMove();
  useEffect(() => {
    handleMoveToPage(FOOTER_CATEGORY.photo);
  }, []);

  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);

  const [percent, setPercent] = useState(0);

  function handleModal() {
    setIsShow((is) => !is);
  }
  let imgRef = useRef();
  let imgURL;

  let loadImg = (e) => {
    if (!e.target.files[0]) {
      // input에서 받은 이미지가 없을경우 함수종료한다.
      window.alert("이미지를 선택해 주세요.");
      return;
    }

    let imgFile = e.target.files[0]; // input에서 받은 이미지파일 객체 저장.
    imgURL = URL.createObjectURL(imgFile); // 이미지 URL 생성.
    console.log(imgURL);

    imgRef.current.setAttribute("src", imgURL); // 생성된 이미지URL을 선택된img요소 src속성에 넣어준다.
  };
  const [imageSrc, setImageSrc] = useState("");
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  function upload() {
    setIsShowResult(true);
    setIsShow(false);
    const random = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
    setPercent(random);
  }

  return (
    <Page>
      {isShowResult && (
        <Modal handleClickSingleButton={() => setIsShowResult(false)}>
          <ModalWrapper>
            <ModalTitle>당신의 거북목 지수는 {percent}%입니다!</ModalTitle>
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

            <Input
              type="file"
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
                console.log(e.target.files[0].name);
              }}
            />

            <Button type="button" onClick={upload}>
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
        <Title>기록</Title>
        <Box>
          <RealImg src={img1} />
          <TextWrapper>
            <p>2023.10.20</p>
            <p>거북목 측정 결과 : 82%</p>
          </TextWrapper>
        </Box>
        <Box>
          <RealImg src={img2} />
          <TextWrapper>
            <p>2023.10.20</p>
            <p>거북목 측정 결과 : 74%</p>
          </TextWrapper>
        </Box>
        {imageSrc && percent && (
          <Box>
            <RealImg src={imageSrc} alt="이미지" />
            <TextWrapper>
              <p>2023.10.20</p>
              <p>거북목 측정 결과 : {percent}%</p>
            </TextWrapper>
          </Box>
        )}
      </ContentWrapper>
      <Footer />
    </Page>
  );
}

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
