import styled, { css } from 'styled-components';
import { colors } from '../../global/colors';

export const Board = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const Column = styled.div<{$bgColor: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: max-content;
  min-height: 100px;
  width: 220px;
  margin: 1rem;
  border-radius: 1rem;
  background-color: ${({ $bgColor }) => $bgColor};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`

export const ColumTitle = styled.p`
  font-weight: 700;
`;

export const ColumnBody = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  & input {
    padding: 0.3rem 0.3rem 0.3rem 0.7rem;
    line-height: 1.5rem;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: inherit;
    max-width: 100px;
    margin-left: 1rem;
    border: 2px solid ${colors.lightGrey};
    border-radius: .5rem;
    transition: border .3s ease;

    &:focus {
        outline: none;
        border-color: ${colors.violet};
    }
  }
`;

export const Item = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 160px;
  margin: 1rem auto;
  border-radius: 0.5rem;
  background-color: ${colors.itemBackground};
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);

  &:hover {
    button {
      opacity: 1;
    }
  }
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 0.7rem;
  border: none;
  background: none;

  &:hover {
    color: ${colors.violet};
  }

  & svg {
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

const ButtomActionStyled = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -0.8rem;
  padding: 0.2rem 0.2rem;
  opacity: 0;
  border-radius: 1rem;
  background: none;
  border: 1px solid transparent;
  transition: opacity 0.3s ease-out;

  &:hover {
    border: 1px solid black;
  }

  & svg {
    cursor: pointer;
    font-size: 1.3rem;
  }
`;

export const ButtonDelete = styled.button`
  ${ButtomActionStyled}
  right: -0.2rem;
`;

export const ButtonEdit = styled.button`
  ${ButtomActionStyled}
  right: 1.3rem;
`;
