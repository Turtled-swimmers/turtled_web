import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../api/auth";
import { setCookie } from "../../api/cookie";

interface LoginFormValue {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormValue>();

  const { mutate: loginData } = useMutation(["login"], login, {
    onSuccess: (accessToken) => {
      setCookie("accessToken", accessToken, {
        secure: true,
      });
      navigate("/home");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmitHandler: SubmitHandler<LoginFormValue> = (data) => {
    loginData({ username: data.email, password: data.password });
  };

  function handleMoveToSignup() {
    navigate("/signup");
  }

  return (
    <SignupContainer>
      <SigninWrapper onSubmit={handleSubmit(onSubmitHandler)}>
        <Title>이메일</Title>
        <Input {...register("email", { required: true })} type="email" />
        {errors.email && errors.email.type === "required" && <Error>이메일을 입력해 주세요!</Error>}
        <Title>비밀번호</Title>
        <Input {...register("password", { required: true })} type="password" />
        {errors.password && errors.password.type === "required" && <Error>비밀번호를 입력해 주세요!</Error>}

        <BottomSection>
          <>비밀번호 찾기 </>
          <> | &nbsp;</>
          <div onClick={handleMoveToSignup}>회원가입</div>
        </BottomSection>

        <Button>로그인</Button>
      </SigninWrapper>
    </SignupContainer>
  );
}
const BottomSection = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  ${({ theme }) => theme.fonts.sub};
  color: ${({ theme }) => theme.colors.gray1};
`;

const Button = styled.button`
  display: flex;
  height: 4.8rem;
  padding: 1.2rem 8rem;
  margin: 5rem 0;
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

const SignupContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  padding: 0 5rem;
`;

const SigninWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors.green};
  ${({ theme }) => theme.fonts.sub};
  margin-top: 2rem;
`;

const Error = styled.p`
  color: #fcb3a6;
  ${({ theme }) => theme.fonts.caption};
`;

const Input = styled.input`
  height: 4.5rem;
  border-radius: 1rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.green};
`;
