import React from "react";
import { useSelector } from "react-redux";
import Modal from "../reusables/modal";
import styled from "styled-components";

const EnableLocation = () => {
  const longitude = useSelector(state => state.General.longitude);
  const modalState = useSelector(state => state.General.modalState);
  const latitude = useSelector(state => state.General.latitude);
  const theme = useSelector(state => state.General.theme);

  return (
    <>
      {!longitude || !latitude ? (
        <Modal title="" desc={``} width={"30%"} visible={modalState}>
          <SectionWrapper>
            <SectionBody>
              {theme ? (
                <embed src="/assets/location.svg" alt="location-icon" />
              ) : (
                <embed src="/assets/darklocation.svg" alt="location-icon" />
              )}
            </SectionBody>
          </SectionWrapper>
          <div>
            <InfoWrapper>
              Please to contnue, enable location on your device
            </InfoWrapper>
          </div>
        </Modal>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default EnableLocation;

const InfoWrapper = styled.div`
  color: ${({ theme }) => theme.flexiblegrey};
  font-size: ${({ theme }) => theme.textXXs};
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const SectionWrapper = styled.div`
  margin-top: 40px;
`;

const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  justify-content: center;
`;
