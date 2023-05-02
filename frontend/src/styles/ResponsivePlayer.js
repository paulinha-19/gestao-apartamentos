import { Player } from '@lottiefiles/react-lottie-player';
import styled from "styled-components";
import {devices} from "../../utils/breakpoints";

export const ResponsivePlayer = styled(Player)`
  @media ${devices.xs} {
    width: 300px;
    height: 100%;
  }
  @media ${devices.sm} {
      width: 300px;
      height: 100%;
  }
  @media ${devices.md} {
      width: 350px;
      height: 100%;
  }
  @media ${devices.lg} {
      width: 400px;
      height: 100%;
  }
  @media ${devices.xl} {
      width: 400px;
      height: 100%;
  }
`;
