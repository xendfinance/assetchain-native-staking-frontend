import { useEffect, useState } from "react";
import axios from "axios";
// import Recaptcha from "react-recaptcha";
import styled from "styled-components/macro";
import { InputContainer } from "./input";
import { RadioButton } from "./radio";
import { ButtonState } from "./button";
import { useFormik } from "formik";
import config from "../methods/config";
import { device } from "../../theme";

import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Input correct email")
    .required("Required!"),
  country: Yup.string().required("Required!"),
  // twitterHandle: Yup.string()
  //   .required("Required")
  //   .matches(/^@(?=.*\w)[\w]{1,15}$/, "Must be a valid twitter handle"),
  numberOfDevices: Yup.number()
    .min(1, "Most be greater than 1")
    .required("Required!")
});

export const WishListModal = ({ toggleModal, showSuccessModal }) => {
  const [switchDevice, setSwitchDevice] = useState(true);

  const handleGenerateReceipt = async () => {
    axios
      .post(
        config.apiUrl + `/v2/WaitingList`,
        {
          ...values,
          device: switchDevice
            ? "Lynx  NFT and Physical Device"
            : "Spider NFT and Physical Device",
          amount: switchDevice
            ? values.numberOfDevices * 1000
            : values.numberOfDevices * 1500
        },
        {
          headers: {
            "Content-Type": "application/json-patch+json"
          }
        }
      )
      .then(
        response => {
          showSuccessModal(true);
          toggleModal(false);
        },
        error => {
          console.log(error, "error");
        }
      );
  };

  const handleSubmitForm = () => {
    handleGenerateReceipt();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      country: "",
      twitterHandle: "",
      numberOfDevices: ""
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmitForm
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    handleBlur,
    touched
  } = formik;

  return (
    <>
      <Overlay onClick={() => toggleModal(false)} />
      <Container>
        <ModalHeader>
          <VectorTwoImage src={"/assets/vector2.svg"} alt={""} />
          <h5>Join</h5>
          <h3>Wicrypt Device Waitlist</h3>
          <VectorOneImage src={"/assets/vector1.svg"} alt={""} />
        </ModalHeader>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <h6>Hello Outlier!</h6>
            <p>
              We're excited that you've decided to join the revolution to
              decentralize connectivity.
              <br /> Kindly fill the form below, to be the first to know about
              our device sales.
            </p>
            <InputSpacer />
            <InputContainer
              type="email"
              name={"email"}
              value={values.email}
              onChange={handleChange}
              errorText={touched.email && errors.email}
              error={touched.email && errors.email}
              onBlur={handleBlur}
              autoComplete="Off"
              label={"Email Address"}
            />
            <label>What Wicrypt Device?</label>
            <RadioButton
              onClick={() => setSwitchDevice(true)}
              label={
                <>
                  Lynx NFT and Physical Device <span>$1,000</span>
                </>
              }
              checked={switchDevice && true}
            />
            <RadioButton
              onClick={() => setSwitchDevice(false)}
              label={
                <>
                  Spider NFT and Physical Device{" "}
                  <span style={{ marginLeft: "23px" }}>$1,500</span>
                </>
              }
              checked={!switchDevice && true}
            />
            <InputContainer
              type="number"
              name={"numberOfDevices"}
              value={values.numberOfDevices}
              onChange={handleChange}
              errorText={touched.numberOfDevices && errors.numberOfDevices}
              error={touched.numberOfDevices && errors.numberOfDevices}
              onBlur={handleBlur}
              autoComplete="Off"
              label={"Number of Devices"}
            />
            <InputContainer
              type="string"
              name={"country"}
              value={values.country}
              onChange={handleChange}
              errorText={touched.country && errors.country}
              error={touched.country && errors.country}
              onBlur={handleBlur}
              autoComplete="Off"
              label={"Country where you reside"}
            />
            <InputContainer
              type="string"
              name={"twitterHandle"}
              value={values.twitterHandle}
              onChange={handleChange}
              errorText={touched.twitterHandle && errors.twitterHandle}
              error={touched.twitterHandle && errors.twitterHandle}
              onBlur={handleBlur}
              autoComplete="Off"
              label={"Twitter"}
            />
            <label>
              Note: Only 15,000 devices available. Early access to mint up to
              10% of Overall DERC20
            </label>
            {/* <CaptchaContainer>
              <Recaptcha
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                render="explicit"
              />
            </CaptchaContainer> */}

            <ButtonContainer>
              <ButtonState
                type="submit"
                buttonClass="primary"
                label={"Join Waitlist"}
              />
              <main></main>
              <ButtonState
                onClick={() => toggleModal(false)}
                buttonClass="secondary"
                label={"Cancel"}
              />
            </ButtonContainer>
          </form>
        </ModalContent>
      </Container>
    </>
  );
};

export const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #000000;
  opacity: 0.6;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Container = styled.div`
  width: 780px;
  background-color: #ffff;
  border-radius: 12px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
  overflow-y: scroll;
  max-height: 800px;

  @media (max-width: 1000px) {
    width: 90%;
  }
  @media (max-width: 500px) {
    max-height: 600px;
  }
  span {
    background: #e5b910;
    border-radius: 4px;
    width: 71px;
    height: 20px;
    margin-left: 37px;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    padding: 1px 13px;
  }

  &::-webkit-scrollbar {
    width: 1px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #c4c4c4;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.headerColor};
  padding: 20px;

  h5 {
    font-size: ${({ theme }) => theme.textXXs};
    color: #ffff;
  }

  h3 {
    font-size: ${({ theme }) => theme.textXs};
    color: rgba(255, 255, 255, 1);
    margin-top: 9px;
  }

  @media ${device.laptop} {
    padding: 32px 40px;

    h5 {
      font-size: 20px;
      color: #ffff;
    }

    h3 {
      font-size: 24px;
      color: rgba(255, 255, 255, 1);
      margin-top: 9px;
    }
  }
`;

const VectorOneImage = styled.img`
  position: absolute;
  right: 0;
  top: 0;
`;

const VectorTwoImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
`;

export const ModalContent = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.modalContainer};
  color: ${({ theme }) => theme.modalText};

  p {
    font-size: ${({ theme }) => theme.textXXs};
    text-align: center;
    color: ${({ theme }) => theme.flexiblegrey};
  }

  h6 {
    line-height: 24px;
    font-size: 16px;
    text-align: center;
  }

  label {
    font-size: 14px;
    color: ${({ theme }) => theme.labelText};
    margin-top: 19.88px;
    display: block;
  }
  @media ${device.laptop} {
    padding: 39px 43.01px;
  }
`;

const InputSpacer = styled.div`
  width: 100%;
  margin-top: 72px;
`;

const CaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 29px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 28.37px;

  main {
    width: 20px;
    height: 30px;
  }

  button {
    @media (max-width: 500px) {
      &:last-of-type {
        margin-top: 20px;
      }
    }
  }
`;
