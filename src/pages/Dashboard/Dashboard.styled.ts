import styled from "styled-components";
import { Avatar } from "../../style/g_style";

export const DashboardWrap = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 110px);
  width: 100%;
  gap: 40px;
  @media (max-width: 768px) {
    gap: 0;
  }
`;

export const MiddleContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
`;

export const InfoBlock = styled.div<any>`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  gap: 12px;
  left: 46px;
  top: 100px;
  @media (max-width: 1024px) {
    left: 36px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const BoardWrap = styled.div<any>`
  padding: 15px 10px;
  position: absolute;
  height: 70vh;
  max-height: 70vh;
  overflow: hidden;
  width: auto;
  min-height: 50px;
  border: 4px solid var(--yellow);
  right: 40px;
  top: 94px;
  background-color: var(--dark-bg);
  h2 {
    margin-bottom: 20px;
  }
  .leadData {
    overflow-y: scroll;
    height: fill-available;
    padding-bottom: 50px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  opacity: 0;
  min-width: 339px;
  @media (max-width: 1024px) {
    right: 30px;
  }
  @media (max-width: 600px) {
    right: 20px;
  }
  @media (max-width: 380px) {
    right: auto !important;
  }
`;

export const LeadTable = styled.table<any>`
  border-spacing: 0px 10px;
  height: 10vh;
`;

export const LeaderHead = styled.h2`
  color: var(--pink);
  font-family: "Reggae One", cursive;
  text-align: center;
`;

export const LeadText = styled.p`
  font-family: "Gluten", cursive;
  color: var(--light);
  margin: 0px 15px;
`;

export const LeadAvatar = styled(Avatar)`
  border: none;
  height: 45px;
`;
