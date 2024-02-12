import React, { FC, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { ReactComponent as Close } from "./close.svg";
import { togglemodal } from "../../methods/redux/actions";
import { device } from "../../../src/styles/theme";

interface Props {
  width?: string;
  title?: string;
  desc?: string;
  visible?: boolean;
  modalId?: string;
  close?: ()=> void;
  others?: any;
  contentWidth?: any;
  padding?: string;
  icon?: string
}

const Modal: FC<Props> = ({
  children,
  title,
  visible,
  close,
  width,
  contentWidth,
  padding,
  icon
}) => {
  const dispatch = useDispatch();

  const bodyOfModal = useRef<HTMLDivElement>(null);
  const [open, setopen] = useState(false);
  const [show, setshow] = useState(false);

  useEffect(() => {
    if (visible) {
      setopen(true);
      setTimeout(() => {
        setshow(true);
      }, 80);
    } else {
      setshow(false);
      setTimeout(() => {
        setopen(false);
      }, 100);
    }
  }, [visible]);

  const closeModal = e => {
    if (
      show &&
      bodyOfModal.current &&
      !bodyOfModal.current.contains(e.target)
    ) {
      //close();
      dispatch(togglemodal(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  });

  return (
    <ModalStyles open={open} show={show} width={width} padding={padding}>
      <ModalCard ref={bodyOfModal} className="modal-content">
        {title && (
          <ModalControls>
            <div>
              <img src={icon} alt="icon" />
              <ModalTitle> {title}</ModalTitle>
            </div>
           

            <CloseContainer onClick={() => dispatch(togglemodal(false))}>
              <Close className="close-btn" />
            </CloseContainer>
          </ModalControls>
        )}
        {/* <div className="modal-content">{children}</div> */}
        <ModalContent contentWidth={contentWidth}>{children}</ModalContent>
      </ModalCard>
    </ModalStyles>
  );
};

export default Modal;

interface ModalStylesProps {
  open: boolean;
  show: boolean;
  width?: string;
  contentWidth?: string;
  padding?: string;
}
const ModalStyles = styled.div<ModalStylesProps>`
  display: none;
  position: fixed;
  background-color: transparent;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  & > div {
    position: relative;
    overflow-y: auto;
    padding: 30px;
    width: 100%;
    max-width: 90%;
    margin: auto;
    margin-top: 100px;
    border-radius: 30px;
    min-height: 300px;
    opacity: 0;
    transform: scale(0.8);
    transition: all 300ms ease;
    @media ${device.laptop} {
      max-width: ${({ width }) => (width ? width : "640px")};
    }
  }

  ${({ open, show }) =>
    open &&
    css`
      display: block;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 5;

      & > div {
        ${show &&
          css`
            opacity: 1;
            background: ${p => p.theme.primary};
            transform: scale(1);
          `}
      }
    `};
`;
// padding: ${({ padding }) => padding ? padding : '30px'};
const ModalControls = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 20px;
  margin-bottom: 10px;
  justify-content: space-between;

  & .heading {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 5px;
    text-transform: capitalize;
  }

  & .desc {
    font-size: 1rem;
    color: #959595;
  }

  & > div:first-child {
    flex: 1;
  }

  & button.close {
    border: none;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ededed !important;
    cursor: pointer;
  }

  & .close-btn {
    color: ${({ theme }) => theme.flexiblegrey};
  }

  div{
    display: flex;
    gap: 1rem;
  }
`;

const CloseContainer = styled.div`
  cursor: pointer;
`;

const ModalContent = styled.div<Props>`
  // max-width: ${({ contentWidth }) => contentWidth && contentWidth};
  // min-width: 30%;
  // margin: 0 auto;
  background-image: url("/assets/modal.svg");
  background-repeat: no-repeat;
  background-position: center;
`;

const ModalCard = styled.div`
  background-color: ${({ theme }) => theme.mainColor};
`;

const ModalTitle = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.textXs};
  font-weight: bold;
  margin-bottom: 0;
`;
