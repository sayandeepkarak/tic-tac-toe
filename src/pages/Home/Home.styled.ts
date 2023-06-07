import styled from "styled-components";

export const MainWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 160px);
  gap: 40px;
`;

export const AbsoluteWrapper = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0px 40px;
  top: 40vh;
`;
