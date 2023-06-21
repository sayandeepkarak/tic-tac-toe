import styled from "styled-components";
import { Image } from "../../style/g_style";

export const Banner = styled(Image)`
  @media (min-width: 600px) {
    height: 60vh;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;
