import React, { FC, useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Close } from '../../assets/icons/close.svg';

interface Props {
    width?: string
    title?: string
    desc?: string
    visible?: boolean
    modalId?: string
    close?: Function
    others?: any
    contentWidth?: any
    padding?: string;
}


const Modal: FC<Props> = ({ children, title, desc, visible, modalId, close, width, contentWidth, padding }) => {
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

    const closeModal = (e) => {
        if (show && bodyOfModal.current && !bodyOfModal.current.contains(e.target)) {
            close();            
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => {
            document.removeEventListener('mousedown', closeModal);
        };
    });

    return (
        <ModalStyles open={open} show={show} width={width} padding={padding}>
            <div ref={bodyOfModal} className="modal-cont">
                {title && <ModalControls>
                    <div>
                        <p className="heading">{title}</p>
                        <p className="desc">{desc}</p>
                    </div>
                    <div>
                        <button onClick={() => close()} className="close">
                            <Close className="close-btn" />
                        </button>
                    </div>
                </ModalControls>}
              
                <ModalContent contentWidth={contentWidth}>{children}</ModalContent>
            </div>
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
	background: rgb(255, 255, 255);
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
		max-width: ${({ width }) => width ? width : '640px'};
		margin: auto;
		margin-top: 100px;
		border-radius: 30px;
		min-height: 300px;
		opacity: 0;
		transform: scale(0.8);
		transition: all 300ms ease;
        background:#1C1D21;
	}

	${({ open, show }) => open && css`
		display: block;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 5;

		& > div {
			${show && css`
				opacity	: 1;
                background:#1C1D21;
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

    & .heading {
        font-weight: 600;
        font-size: 1.5rem;
        margin-bottom: 5px;
        text-transform: capitalize;
        color:#edecec;
    }

    & .desc {
        font-size: 1rem;
        color: #edecec;
    }

    & > div:first-child {
        flex: 1;
        color:#edecec;
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
            color: ${p => p.theme.font};
        }
`;

const ModalContent = styled.div<Props>`
    max-width: ${({ contentWidth }) => contentWidth && contentWidth};
    min-width: 30%;
    margin: 0 auto;
`;
