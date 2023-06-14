import { leadData } from "../../types/dashboardType";
import { Image } from "../../style/g_style";
import thunderIcon from "../../assets/thunder..png";
import { LeadAvatar, LeadText } from "./Dashboard.styled";

type props = {
  data: leadData;
  index: number;
  key: number;
};

const Leaders = ({ data, index }: props) => {
  return (
    <>
      <tr>
        <td>
          <LeadText>{index}</LeadText>
        </td>
        <td>
          <LeadAvatar src={data.photoURL} />
        </td>
        <td>
          <LeadText>{data?.name}</LeadText>
        </td>
        <td>
          <Image height="20px" src={thunderIcon} />
        </td>
        <td>
          <LeadText>{data?.points}</LeadText>
        </td>
      </tr>
    </>
  );
};

export default Leaders;
