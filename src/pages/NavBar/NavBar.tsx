import * as S from './NavBar.styled';

const NavBar = () => {
  return (
    <S.NavBar>
      <div className="logo">Logo</div>
      <ul>
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
        <li>Home</li>
        <li>Login</li>
      </ul>
    </S.NavBar>
  );
};

export default NavBar;