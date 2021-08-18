import React from "react";
import logo from "../2a-Learning_TandemLogo_BrashBurgandy.png";

const Header = () => {
  return (
    <header className="header">
      <a href="https://madeintandem.com/">
        <img src={logo} alt="Tandem Logo" className="logo" />
      </a>
      <h1 className="title">Create a tandem pattern</h1>
    </header>
  );
};

export default Header;
