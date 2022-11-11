import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header(): JSX.Element {
  return (
    <header className="header">
      <nav className="nav">
        <Link className="nav__link" to="boards/:id">
          Create board
        </Link>

        <Link className="nav__link" to="profile">
          Edit profile
        </Link>

        <Link className="nav__link" to="logout">
          Sign Out
        </Link>

        <select className="nav__select">
          <option value="EN">EN</option>
          <option value="UA">UA</option>
          <option value="BY">BY</option>
          <option value="RU">RU</option>
        </select>
      </nav>
    </header>
  );
}

export default Header;
