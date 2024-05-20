import styled, { keyframes } from 'styled-components';
import { colors } from '../global/colors';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid ${colors.grey};
  border-right: 2px solid ${colors.grey};
  border-bottom: 2px solid ${colors.grey};
  border-left: 4px solid ${colors.black};
  background: transparent;
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

export default Spinner;
