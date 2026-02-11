import React from "react";
import "./Header.css";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="library-header">
      <div className="header-container">
        <Link to="/">
          <img src="/Images/Logo.png" alt="Logo Biblioteca" className="library-logo" />
        </Link>
        <div className="header-text">
          <h1 className="library-title">BIBLIOTECA POPULAR</h1>
          <p className="library-subtitle">Dr. Antonio Novaro</p>

        </div>
      </div>
    </header>
  );
};

export default Header;


