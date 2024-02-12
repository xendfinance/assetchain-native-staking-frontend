import styled from "styled-components/macro";

export const RadioButton = ({ onClick, label, checked, disabled, name }) => {
  return (
    <RadioButtonContainer onClick={onClick}>
      <RadioButtonInput
        type={"radio"}
        checked={checked}
        disabled={disabled}
        name={name}
      />
      <RadioButtonLabel htmlFor={name}>{label}</RadioButtonLabel>
    </RadioButtonContainer>
  );
};

const RadioButtonLabel = styled.label`
  color: #6b6b6b;
  font-size: 16px;
  margin-left: 10px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RadioButtonInput = styled.input`
  margin-top: 20px;
`;
