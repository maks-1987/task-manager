import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { languages } from '../../locales/languages';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import ThemeSelector from '../../UI/selectors/ThemeSelector';
import './header.css';

function Header(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlise);

  const location = useLocation();
  const paths: string[] = ['/', '/login', '/register'];

  return paths.includes(location.pathname) ? (
    <></>
  ) : (
    <header className={'header ' + state.themeIndex}>
      <nav className="nav">
        <Link className={'nav__link ' + state.themeIndex} to="boards">
          {languages.createBoard[state.languageIndex]}
        </Link>

        <Link className={'nav__link ' + state.themeIndex} to="profile">
          {languages.editProfile[state.languageIndex]}
        </Link>

        <Link className={'nav__link ' + state.themeIndex} to="logout">
          {languages.signOut[state.languageIndex]}
        </Link>

        <LanguageSelector />
        <ThemeSelector />
      </nav>
    </header>
  );
}

export default Header;
