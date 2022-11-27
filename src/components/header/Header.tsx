import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { languages } from '../../locales/languages';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import ThemeSelector from '../../UI/selectors/ThemeSelector';
import './Header.css';
import { setIsCreateBoard, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { localeEN } from '../../locales/localeEN';

function Header(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlise);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const paths: string[] = ['/', '/login', '/register'];

  const addBoardButtonHandler = () => {
    dispatch(setModalOpen(true));
    dispatch(setIsCreateBoard(true));
  };

  return paths.includes(location.pathname) ? (
    <></>
  ) : (
    <header className={'header ' + state.themeIndex}>
      <nav className="nav">
        <button
          className={'nav__link ' + state.themeIndex}
          onClick={addBoardButtonHandler}
          title={localeEN.tooltips.CREATE_NEW_BOARD[state.languageIndex]}
        >
          {languages.createBoard[state.languageIndex]}
        </button>

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
