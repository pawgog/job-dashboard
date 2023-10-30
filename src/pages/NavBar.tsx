import * as S from './NavBar.styled';

const NavBar = () => {
  return (
    <S.NavBar>
      <div className="logo">Logo</div>
      <ul>
        <li>Home</li>
        <li>Login</li>
      </ul>
    </S.NavBar>
  );
};

export default NavBar;