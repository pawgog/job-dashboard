import { styled } from 'styled-components';
import { colors } from '../global/colors';

export const ButtonContent = styled.div`
  position: absolute;
  top: 0.3rem;
  right: 0.5rem;
  border: 1px solid ${colors.lightGrey};
  background-color: ${colors.white}; 
`;

export const ButtonDots = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 1rem;
  right: 0.5rem;
  cursor: pointer;

  & svg {
    pointer-events: none;
  }
`;

export const ButtomAction = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.2rem 0.2rem;
  background: none;
  border: none;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${colors.lightGrey};
  }

  & svg {
    cursor: pointer;
    font-size: 1.3rem;
  }

  & span {
    margin-left: 0.3rem;
  }
`;
