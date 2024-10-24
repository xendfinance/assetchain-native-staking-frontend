import styled from "styled-components";

export const Button = styled.button`
  padding: 11px 53px;
  border-radius: 30px;
  border: 0px;
  background: #2042B8;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;


  &:disabled {
    background-color: ${({ theme }) => theme.disabledColor};
  }
`;


export const WalletOption = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 1rem;
  background-color: ${({ theme }) => theme.highlight2};
  margin-bottom: 1rem;
  padding: 0.5rem;
  cursor: pointer;
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Content = styled.div`
  padding: 20px;
  border-radius: 8px;
`;
