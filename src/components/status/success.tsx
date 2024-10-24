import React from "react";
import { useDispatch } from "react-redux";
import Modal from "../reusables/modal";
import { ButtonContainer, CenterContainer, Msg, Title } from "./statusstyle";
import { ButtonState } from "../reusables/button";
import { staketogglemodal } from "../../methods/redux/actions";
import success from "../../assets/icons/success.svg"


const Success = ({ title, msg }) => {
  const dispatch = useDispatch();
  return (
    <Modal visible={true} width={"30%"}>
      <div>
        <CenterContainer>
          <img alt="failed-img" src={success}/>
        </CenterContainer>
        <CenterContainer>
          <Title> {title}</Title> <Msg>{msg}</Msg>
        </CenterContainer>
        <ButtonContainer>
          <div className="col-lg-12 t-center ">
            <ButtonState
              fontSize={"0.8rem"}
              buttonClass={"secondary"}
              label={"Close"}
              onClick={() => dispatch(staketogglemodal(0))} 
              padding={""}            
            />
          </div>
        </ButtonContainer>
      </div>
    </Modal>
  );
};

export default Success;
