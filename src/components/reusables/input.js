import styled from "styled-components/macro";

export const InputContainer = ({ label, error, errorText, ...rest }) => {
  return (
    <Container>
      <label>{label}</label>
      <input {...rest} />
      {error ? <ErrorText>{errorText}</ErrorText> : null}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  label {
    font-size: 14px;
    color: rgba(107, 107, 107, 1);
    display: block;
  }

  input {
    width: 100%;
    height: 40.12px;
    border: none;
    border-bottom: 1px solid rgba(107, 107, 107, 0.3);
    outline: none;
    background-color: transparent;
    color: ${({ theme }) => theme.modalText};
  }
`;

const ErrorText = styled.p`
  margin-top: 0px!important;
  font-size: 12px!important;
  color: red;
  text-align: left!important;
`;
