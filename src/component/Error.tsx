import { styled } from 'styled-components';
import { colors } from '../global/colors';

export const ErrorMessageContent = styled.div`
  font-size: 8px;
  color: ${colors.red};
`;

type Prop = {
  text: string;
};

const ErrorMessage = ({ text }: Prop) => {
  return <ErrorMessageContent>{text}</ErrorMessageContent>;
};
export default ErrorMessage;
