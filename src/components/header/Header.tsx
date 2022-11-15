import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import ThemeSelector from '../../UI/selectors/ThemeSelector';
import './header.css';

function Header(): JSX.Element {
  const location = useLocation();
  const paths: string[] = ['/', '/login', '/register'];

  return paths.includes(location.pathname) ? (
    <></>
  ) : (
    <header className="header">
      <nav className="nav">
        <Link className="nav__link" to="boards">
          Create board
        </Link>

        <Link className="nav__link" to="profile">
          Edit profile
        </Link>

        <Link className="nav__link" to="logout">
          Sign Out
        </Link>

        <LanguageSelector />
        <ThemeSelector />
      </nav>
    </header>
  );
}

export default Header;
