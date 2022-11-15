import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { languages } from '../../locales/languages';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import './welcomePage.css';
import ThemeSelector from '../../UI/selectors/ThemeSelector';

function WelcomePage() {
  const state = useAppSelector((store) => store.settingsSlise);

  return (
    <>
      <div className="welcome-page-container">
        <div className="selectors-container">
          <LanguageSelector />
          <ThemeSelector />
        </div>
        <div className="auth-links">
          <Link to="/login" className="auth-link">
            {languages.signIn[state.languageIndex]}
          </Link>
          <Link to="/register" className="auth-link">
            {languages.register[state.languageIndex]}
          </Link>
        </div>
        <div className="welcome-page-content">bla-bla-bla...</div>
      </div>
    </>
  );
}

export default WelcomePage;
