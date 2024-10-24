import styled from "styled-components/macro";

export const ButtonState = ({
  buttonClass,
  padding,
  fontSize,
  onClick,
  label,
  ...restProps
}) => {
  if (buttonClass === "primary") {
    return (
      <PrimaryBtn
        padding={padding}
        fontSize={fontSize}
        onClick={onClick}
        {...restProps}
      >
        {label}
      </PrimaryBtn>
    );
  } else if (buttonClass === "secondary") {
    return (
      <SecondaryBtn
        padding={padding}
        fontSize={fontSize}
        onClick={onClick}
        {...restProps}
      >
        {label}
      </SecondaryBtn>
    );
  } else if (buttonClass === "secondary-alt") {
    return (
      <SecondaryAltBtn
        padding={padding}
        fontSize={fontSize}
        onClick={onClick}
        {...restProps}
      >
        {label}
      </SecondaryAltBtn>
    );
  } else {
    return <p>attach valid btn_class</p>;
  }
};

const PrimaryBtn = styled.button`
  background-color: ${({ theme }) => theme.highlight};
  padding: ${({ padding }) => padding || "11px 53px"};
  font-size: ${({ fontSize }) => fontSize || "18px"};
  font-weight: bold;
  color: #fff;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    opacity: 0.6;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledColor};
  }
`;

const SecondaryBtn = styled.button`
  background-color: transparent;
  padding: ${({ padding }) => padding || "11px 53px"};
  font-size: ${({ fontSize }) => fontSize || "18px"};
  color: ${({ theme }) => theme.highlight};
  border-radius: 30px;
  border: ${({ theme }) => `2px solid ${theme.highlight}`};
  cursor: pointer;
  transition: 0.3s ease-in-out;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.highlight};
    color: ${({ theme }) => theme.white};
    transition: 1s ease-in-out;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledColor};
  }
`;

const SecondaryAltBtn = styled.button`
  background-color: transparent;
  padding: ${({ padding }) => padding || "11px 53px"};
  font-size: ${({ fontSize }) => fontSize || "18px"};
  color: ${({ theme }) => theme.blue};
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.blue};
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    opacity: 0.6;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledColor};
  }
`;
