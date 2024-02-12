import styled from "styled-components";
import { device } from "../../styles/theme";

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export const WalletDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-left: 15px;
`;

export const Symbol = styled.p`
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.textXXs};
  color: ${({ theme }) => theme.flexiblegrey};
  font-weight: 600;
  margin-right: 50;
`;

export const InstructionBox = styled.div`
  padding: 20px;
  background: rgba(37, 52, 106, 0.1);
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 20px;
`;

export const Instruction = styled.p`
  font-size: ${({ theme }) => theme.textXXs};
  color: ${({ theme }) => theme.flexiblegrey};
  margin-bottom: 0;
`;

export const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 50px;
  margin-top: 20px;
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.textSm};
  color: ${({ theme }) => theme.highlight};
  font-weight: 600;
`;

export const CurrentStakeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Text = styled.p`
  font-size: ${({ theme }) => theme.textXs};
  color: ${({ theme }) => theme.grey};
  font-weight: 600;
`;

export const Value = styled.p`
  font-size: ${({ theme }) => theme.textXs};
  color: #16ab5b;
  font-weight: 500;
`;

export const ErrMsg = styled.p`
  font-size: ${({ theme }) => theme.textXXs};
  background-color: ${({ theme }) => theme.error};
  border-radius: 6px;
  padding: 5px;
  color: ${({ theme }) => theme.white};
  text-align: center;
  font-weight: 600;
`;
