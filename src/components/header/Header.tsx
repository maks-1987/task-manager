import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { persistor } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { languages } from '../../locales/languages';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import ThemeSelector from '../../UI/selectors/ThemeSelector';
import { setIsCreateBoard, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { localeEN } from '../../locales/localeEN';
import { userSlice } from '../../redux/user-slice/userSlice';
import './Header.css';

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

        <Link
          className={'sign-out-btn ' + state.themeIndex}
          to="/"
          onClick={() => {
            dispatch(userSlice.actions.setUserData({ id: '', name: '', login: '' }));
            dispatch(userSlice.actions.setUserToken(''));
            persistor.pause();
            persistor.flush().then(() => {
              return persistor.purge();
            });
          }}
        >
          {languages.signOut[state.languageIndex]}
        </Link>

        <LanguageSelector />
        <ThemeSelector />
      </nav>
    </header>
  );
}

export default Header;
