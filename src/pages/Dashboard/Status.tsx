import { Image, InfoText } from "../../style/g_style";
import { InfoBlock, InfoRow } from "./Dashboard.styled";
import thunderIcon from "../../assets/thunder..png";

const UserInfo = () => {
  return (
    <>
      <InfoBlock>
        <InfoRow>
          <Image height="30px" src={thunderIcon} />
          <InfoText>200</InfoText>
        </InfoRow>
        <InfoText>Online : 30</InfoText>
      </InfoBlock>
    </>
  );
};

export default UserInfo;
