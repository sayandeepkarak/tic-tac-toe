import styled from "styled-components";

export const SpinLoader = styled.span`
  width: 60px;
  height: 60px;
  background: #fff;
  display: inline-block;
  border-radius: 50%;
  box-sizing: border-box;
  animation: animloader 1s ease-in infinite;

  @keyframes animloader {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
