import styled from 'styled-components';

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

export const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 160px;
  margin: 1rem auto;
  border-radius: 0.5rem;
  background-color: #fafdff;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.4rem;
  border-radius: 0.7rem;
  border: none;

  & input {
    max-width: 100px;
    margin-left: 0.5rem;
    border: none;
    box-shadow: 0px 0 5px 1px #D3D3D3;
  }
  & svg {
    font-size: 1.5rem;
  }
`;