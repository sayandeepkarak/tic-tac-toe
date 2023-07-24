import styled from "styled-components";
import { Image } from "../../style/g_style";

export const Banner = styled(Image)`
  opacity: 0;
  @media (min-width: 600px) {
    height: 60vh;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;
