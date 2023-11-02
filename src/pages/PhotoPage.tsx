import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getHistory, getHistoryDetail, uploadPhoto, uploadPhotoWithoutLogin } from "../api/photo";
import { HiTurtleIc } from "../assets";
import Footer from "../components/common/Footer";
import Modal from "../components/common/Modal";
import PhotoHeader from "../components/common/PhotoHeader";
import { FOOTER_CATEGORY } from "../core/footerCategory";
import useFooterMove from "../hooks/useFooterMove";
import { isLogined } from "../utils/join/isLogined";
import Loading from "./Loading";

interface CardType {
  created_date: string;
  img_url: string;
  percentage: number;
  record_id: string;
}

interface DetailType {
  exercise_img_list: { url: string; content: string }[];
  img_url: string;
  percentage: number;
}

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
  const [result, setResult] = useState({ exercise_img_list: [], image: "", percentage: 0 });
  const { mutate: uploadFile, isLoading } = useMutation(() => uploadPhoto(file), {
    onSuccess: (response) => {
      setIsShowResult(true);
      setIsShow(false);
      setResult(response);
    },
    onError: (err: any) => {
      // alert(err.message);
      console.log(err);
      alert("파일의 용량이 큽니다. 동영상의 길이는 1~2초 이내로 업로드해주세요.");
    },
  });

  const { mutate: uploadFileWithoutLogin, isLoading: isLoadingWithoutLogin } = useMutation(
    () => uploadPhotoWithoutLogin(file),
    {
      onSuccess: (response) => {
        setIsShowResult(true);
        setIsShow(false);
        setResult(response);
      },
      onError: (err: any) => {
        console.log(err);
        // alert(err.message);
        alert("파일의 용량이 큽니다. 동영상의 길이는 1~2초 이내로 업로드해주세요.");
      },
    },
  );

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

  const { data: historys } = useQuery(["historys"], getHistory, {
    onSuccess: (res) => {
      // console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
    enabled: !!isLogined(),
  });

  const [isShowDetail, setIsShowDetail] = useState(false);
  const [details, setDetails] = useState<DetailType>({ exercise_img_list: [], img_url: "", percentage: 0 });

  const { mutate: detailList } = useMutation(["historyDetails"], getHistoryDetail, {
    onSuccess: (res) => {
      setDetails(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handleMoveToDetail(id: string) {
    detailList(id);
    setIsShowDetail(true);
  }

  function handleUpload() {
    if (isLogined()) {
      uploadFile();
    } else {
      uploadFileWithoutLogin();
    }
  }

  if (isLoading || isLoadingWithoutLogin) return <Loading />;

  return (
    <Page>
      {/* 디테일 */}
      {isShowDetail && (
        <Modal handleClickSingleButton={() => setIsShowDetail(false)}>
          <ModalWrapper>
            <ResultImage src={details.img_url} />
            <ModalTitle>당신의 거북목 지수는 {details.percentage}%입니다!</ModalTitle>
            <ModalSub>👇Turtled가 추천하는 스트레칭👇</ModalSub>
            {details?.exercise_img_list.length > 0 &&
              details.exercise_img_list.map(({ url, content }) => {
                return (
                  <>
                    <Image src={url} />
                    <Content>{content}</Content>
                  </>
                );
              })}
          </ModalWrapper>
        </Modal>
      )}
      {/* 측정 직후 모달 */}
      {isShowResult && (
        <Modal handleClickSingleButton={() => setIsShowResult(false)}>
          <ModalWrapper>
            <ResultImage src={result.image} />
            <ModalTitle>당신의 거북목 지수는 {result.percentage}%입니다!</ModalTitle>
            <ModalSub>👇Turtled가 추천하는 스트레칭👇</ModalSub>
            {/* {result.percentage > 50 ? <Image src={red} /> : <Image src={green} />} */}
            {result?.exercise_img_list.length > 0 &&
              result.exercise_img_list.map(({ url, content }) => {
                return (
                  <>
                    <Image src={url} />
                    <Content>{content}</Content>
                  </>
                );
              })}
          </ModalWrapper>
        </Modal>
      )}
      {isShow && (
        <Modal handleClickSingleButton={handleModal}>
          <ModalWrapper>
            <ModalTitle>이렇게 촬영해주세요!</ModalTitle>
            <ModalSub>(1) 자연스러운 옆모습을 영상 촬영(1~2초)해주세요!</ModalSub>
            <ModalSub>
              (2) 무엇인가를 보고 있는 모습이라면
              <br />더 정확하게 측정가능하답니다!
            </ModalSub>

            <Input type="file" onChange={handleFileChange} />

            <Button type="button" onClick={handleUpload}>
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
      {isLogined() && (
        <CardsContainer>
          {historys.length > 0 &&
            historys.map(({ created_date, img_url, percentage, record_id }: CardType) => {
              return (
                <Card key={record_id} onClick={() => handleMoveToDetail(record_id)}>
                  <CardImg src={img_url} />
                  <Wrapper>
                    <CardContent>측정일 : {created_date}</CardContent>
                    <CardContent>거북목 지수 : {percentage}%</CardContent>
                  </Wrapper>
                </Card>
              );
            })}
        </CardsContainer>
      )}

      <Footer />
    </Page>
  );
}

const CardsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  width: 100%;

  padding-bottom: 15rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 1rem;
`;

const CardImg = styled.img`
  width: 30%;
  border-radius: 1rem;
`;

const Card = styled.div`
  width: 87%;
  display: flex;
  padding: 1rem 2rem;
  margin: 0.5rem;

  /* justify-content: space-between; */

  border-radius: 0.8rem;
  background: #f8f9fe;
`;

const CardTitle = styled.h1`
  ${({ theme }) => theme.fonts.caption}
`;

const Content = styled.p`
  text-align: center;
  ${({ theme }) => theme.fonts.content}
`;

const CardContent = styled.p`
  ${({ theme }) => theme.fonts.content}
`;

const ResultImage = styled.img`
  width: 80%;
  padding-top: 5rem;
`;
const Image = styled.img`
  width: 80%;
`;

const Page = styled.div`
  /* padding-bottom: 15rem; */
  /* overflow: scroll; */
  /* height: 100vh; */
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
  overflow: scroll;

  padding-bottom: 10rem;
`;

const ModalTitle = styled.h1`
  margin-bottom: 2rem;
  ${({ theme }) => theme.fonts.title};
`;

const ModalSub = styled.p`
  margin-bottom: 1rem;
  ${({ theme }) => theme.fonts.sub};
`;
