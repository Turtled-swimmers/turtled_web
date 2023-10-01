import { ReactNode } from "react";
import styled from "styled-components";
import { Close } from "../../assets";
import useModal from "../../hooks/useModal";

interface ModalProps {
  children: ReactNode;
  handleClickSingleButton: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Modal(props: ModalProps) {
  const { children, handleClickSingleButton } = props;
  const { modalRef, closeModal } = useModal();

  return (
    <ModalWrapper ref={modalRef}>
      <ModalBox>
        <Icon onClick={handleClickSingleButton}>
          <CloseIcon />
        </Icon>
        <ModalContents>{children}</ModalContents>
      </ModalBox>
    </ModalWrapper>
  );
}

const Icon = styled.div`
  position: absolute;
`;

const CloseIcon = styled(Close)``;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  z-index: 13;
  width: 100%;
  height: 100%;
  background-color: rgb(33 37 41 / 60%);
  cursor: pointer;
`;

const ModalContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
`;

const ModalBox = styled.aside`
  display: flex;
  width: 80%;
  height: 45%;
  padding: 1.6rem;
  gap: 2rem;
  flex-shrink: 0;

  border-radius: 1.6rem;
  background: var(--neutral-light-lightest, #fff);
`;
