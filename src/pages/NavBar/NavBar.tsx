import { staticText } from '../../global/staticText';
import * as S from './NavBar.styled';

const NavBar = () => {
  return (
    <S.NavBar>
      <div className="logo">Logo</div>
      <ul>
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">
          &#9776;
        </label>
        <S.NavMenu>
          <li>{staticText.home}</li>
          <li>{staticText.login}</li>
        </S.NavMenu>
      </ul>
    </S.NavBar>
  );
};

export default NavBar;
