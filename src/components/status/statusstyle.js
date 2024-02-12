import styled from "styled-components";

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export const CenterContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;

export const Msg = styled.p`
  font-size: ${({ theme }) => theme.textXs};
  color: ${({ theme }) => theme.flexiblegrey};
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.textSm};
  color: ${({ theme }) => theme.highlight};
  margin-top: 30px;
  font-weight: 600;
`;
