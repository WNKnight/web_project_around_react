import logo from "../images/logo.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Ao redor dos EUA Logo" />
    </header>
  );
}

export default Header;
