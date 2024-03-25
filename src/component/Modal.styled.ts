import { styled } from 'styled-components';

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
  }
`;

export const ModalTitle = styled.h3`
  padding: 1rem;
  margin: 0 auto;
  font-weight: 600;
  align-self: flex-start;
`;