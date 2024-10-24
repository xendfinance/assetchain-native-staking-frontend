import styled, {keyframes} from "styled-components";
import { device } from "../../styles/theme";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const OptionButton = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.textXXs};
  font-weight: ${({ theme }) => theme.textBold};
  color: ${({ theme }) => theme.flexiblegrey};
  border: ${(props) =>
    props.active
      ? `1px solid ${props.theme.highlight}`
      : `1px solid ${props.theme.grey}`};
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.textXXs};
  color: ${({ theme }) => theme.flexiblegrey};
  margin-bottom: 10px;
  font-weight: 600;
`;

export const TermaandConditions = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.grey};
  margin-top: 10px;
  font-weight: 500;
`;

export const AmountBox = styled.div`
  border: ${(props) => `1px solid ${props.theme.grey}`};
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 10px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Value = styled.p`
  font-size: ${({ theme }) => theme.textXXs};
  color: #16ab5b;
  margin-bottom: 10px;
`;

export const StakeAmount = styled.input`
  border: none;
  width: 100%;
  color: ${({ theme }) => theme.flexiblegrey};
  font-weight: bold;
  font-size: ${({ theme }) => theme.textSm};
  background-color: transparent;
  :hover {
    color: ${({ theme }) => theme.flexiblegrey};
    background-color: transparent;
    border: none;
    background-color: transparent;
    outline: none;
    transition: all 500ms ease-in-out;
  }
  :focus {
    color: ${({ theme }) => theme.flexiblegrey};
    outline: none;
    border: none;
    background-color: transparent;
    box-shadow: none;
    transition: all 500ms ease-in-out;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export const RadioButton = styled.input`
  margin-right: 10px;
  cursor: pointer;
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
`;

export const ErrMsg = styled.p`
  /* Typography */
  font-size: ${({ theme }) => theme.textXXs};
  font-weight: 600;
  text-align: center;

  /* Colors */
  background-color: rgba(239, 68, 68, 0.3);
  color: ${({ theme }) => theme.white};

  /* Layout & Spacing */
  border-radius: 6px;
  padding: 6px 8px;
  margin: ${({ margin }) => margin || '8px 0'};
  width: ${({ width }) => width || 'auto'};

  /* Animation */
  animation: ${fadeIn} 0.2s ease-out;

  /* Accessibility */
  &[role='alert'] {
    position: relative;
  }

  /* Optional: Hover state for interactive error messages */
  ${({ interactive }) =>
    interactive &&
    `
    cursor: pointer;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.9;
    }
  `}
`;

export const InfoIcons = styled.div`
  cursor: pointer;
  margin-top: 5px;
`;

export const InfoMsg = styled.p`
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.textXXs};
  color: ${({ theme }) => theme.flexiblegrey};
  margin-right: 50;
  margin-bottom: 20px;
`;
export const InfoTitle = styled.p`
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.textXs};
  color: ${({ theme }) => theme.modalText};
  margin-right: 50;
  margin-bottom: 10px;
  font-weight: 500;
`;
