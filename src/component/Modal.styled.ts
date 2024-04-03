import { styled } from 'styled-components';
import { colors } from '../global/colors';

export const ModalContainer = styled.article`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1;
`;

export const ModalContentContainer = styled.div`
  position: relative;
  width: 45%;
  height: 35%;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

export const ModalIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

export const ModalBodyContainer = styled.div`
  padding: 1rem;
  margin: 0 auto;
  width: 50%;

  & form {
    display: flex;
    flex-direction: column;

    .form-input {
      position: relative;

      & input {
        width: 100%;
        height: 100%;
        padding-top: 20px;
        border: none;
        &:focus-visible {
          outline: 0;
        }
        &:focus + label span,
        &:valid + label span {
          transform: translateY(-150%);
          font-size: 14px;
          left: 0px;
          color: ${colors.lightGrey};
        }
        &:focus + label::after,
        &:valid + label::after {
          border-bottom: 3px solid ${colors.lightGrey};
        }
      }

      & label {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-bottom: 1px solid white;
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border-bottom: 0;
          transition: all 0.3s ease;
        }
        &:focus {
          outline: none;
        }
      }

      & span {
        position: absolute;
        bottom: 0px;
        left: 0px;
        padding-bottom: 1px;
        transition: all 0.3s ease;
      }      
    }

    }
`;

export const ModalTitle = styled.h3`
  padding: 1rem;
  margin: 0 auto;
  font-weight: 600;
  align-self: flex-start;
`;