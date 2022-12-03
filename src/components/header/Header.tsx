import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsCreateBoard, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { setSpinnerStatus } from '../../redux/user-slice/userSlice';
import { languages } from '../../locales/languages';
import { localeEN } from '../../locales/localeEN';
import ThemeSelector from '../../UI/selectors/ThemeSelector';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import GoWelcomePageBtn from '../../UI/go-welcome-page-link/goToWelcomePageBtn';
import './Header.css';

function Header(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlice);
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
      <div className="selectors-container">
        <GoWelcomePageBtn />
        <ThemeSelector />
        <LanguageSelector />
      </div>
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
          to="/logout"
          onClick={() => dispatch(setSpinnerStatus(true))}
        >
          {languages.signOut[state.languageIndex]}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
