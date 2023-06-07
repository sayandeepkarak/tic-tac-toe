import { ReactNode } from "react";
import { Button } from "./IconButton.styled";

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
