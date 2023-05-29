import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  click: () => void;
  children: ReactNode;
};

const IconButton = ({ click, children }: Props) => {
  return (
    <>
      <Button onClick={click}>{children}</Button>
    </>
  );
};

export default IconButton;

const Button = styled.button`
  background-color: var(--yellow);
  border: none;
  outline: none;
  padding: 7px 20px;
  cursor: pointer;
`;
