import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { EMAIL_FORM, NICKNAME_FORM } from "../../utils/join/join";

interface SignupFormValue {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValue>();

  const onSubmitHandler: SubmitHandler<SignupFormValue> = (data) => {
    console.log(data);
  };

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  return (
    <SignupContainer>
      <SigninWrapper onSubmit={handleSubmit(onSubmitHandler)}>
        <Title>이메일</Title>
        <Input {...register("email", { required: true, pattern: EMAIL_FORM })} type="email" />
        {errors.email && errors.email.type === "required" && <Error>이메일을 입력해 주세요!</Error>}
        {errors.email && errors.email.type === "pattern" && <Error>이메일 형식을 확인해주세요!</Error>}
        <Title>닉네임</Title>
        <Input
          {...register("nickname", {
            required: true,
            pattern: NICKNAME_FORM,
            maxLength: 8,
          })}
        />
        {errors.email && errors.email.type === "required" && <Error>닉네임을 입력해 주세요!</Error>}
        {errors.email && errors.email.type === "pattern" && <Error>한글, 영어, 숫자 8자 이내로 입력해주세요!</Error>}
        {errors.email && errors.email.type === "maxLength" && <Error>최대 8자 이내로 입력해주세요!</Error>}

        <Title>비밀번호</Title>
        <Input {...register("password", { required: true })} type="password" />
        {errors.email && errors.email.type === "required" && <Error>비밀번호를 입력해 주세요!</Error>}

        <Title>비밀번호 확인</Title>
        <Input
          {...register("passwordConfirm", {
            required: true,
            validate: (value) => value === passwordRef.current,
          })}
          type="password"
        />
        {errors.email && errors.email.type === "validate" && <Error>비밀번호와 일치하지 않습니다!</Error>}
        <Button>회원가입</Button>
      </SigninWrapper>
    </SignupContainer>
  );
}

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
`;

const Error = styled.p`
  color: "#FCB3A6";
  ${({ theme }) => theme.fonts.caption};
`;

const Input = styled.input`
  height: 4.5rem;
  border-radius: 1rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.green};
  margin-bottom: 2rem;
`;
