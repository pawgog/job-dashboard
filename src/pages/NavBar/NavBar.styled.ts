import styled from 'styled-components';
import { deviceMaxWidth } from '../../global/devices';
import { colors } from '../../global/colors';

export const NavBar = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background-color: ${colors.grey};
  color: ${colors.white};
  z-index: 1;

  .logo {
    font-size: 32px;
  }

  input[type=checkbox] {
    display: none;
  } 

  .hamburger {
    display: none;
    font-size: 24px;
    user-select: none;
  }

  ${deviceMaxWidth.lg`
    .hamburger {
      display: block;
    }
  `}
`;

export const NavMenu = styled.div`
  display: flex;
  gap: 1rem;

  & a {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }

  & a:hover {
    background-color: ${colors.lightGrey};
    transition: 0.3s ease;
  }

  & a:active,
    .active {
      background-color: ${colors.lightGrey};
  }

  ${deviceMaxWidth.lg`
    display: none;
    position: absolute;
    background-color: #7f7d7d;
    right: 0;
    left: 0;
    text-align: center;
    padding: 1rem 0;

    input[type=checkbox]:checked ~ & {
      display: flex;
      flex-direction: column;
    }

    & a + a {
      margin-top: 1rem;
    }

    & a {
      display: inline-block;
      transition: 0.3s ease;
    }
  `}
`;