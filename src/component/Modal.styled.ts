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

    .form-color-picker {
      margin: 1rem 0;
    }

    button {
      outline: 0;
      border: 0;
      will-change: box-shadow,transform;
      background: ${colors.background};
      box-shadow: 0px 2px 4px rgb(45 35 66 / 40%), 0px 7px 13px -3px rgb(45 35 66 / 30%), inset 0px -3px 0px #d6d6e7;
      margin-top: 1rem;
      height: 28px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: box-shadow 0.15s ease,transform 0.15s ease;
      &:hover {
          box-shadow: 0px 4px 8px rgb(45 35 66 / 40%), 0px 7px 13px -3px rgb(45 35 66 / 30%), inset 0px -3px 0px #d6d6e7;
          transform: translateY(-2px);
      }
      &:active{
          box-shadow: inset 0px 3px 7px ${colors.background};
          transform: translateY(2px);
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