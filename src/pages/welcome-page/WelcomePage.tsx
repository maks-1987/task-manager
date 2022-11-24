import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { languages } from '../../locales/languages';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import ThemeSelector from '../../UI/selectors/ThemeSelector';
import './welcomePage.css';

function WelcomePage() {
  const state = useAppSelector((store) => store.settingsSlise);

  return (
    <>
      <div className={'welcome-page-container ' + state.themeIndex}>
        <div className="selectors-container">
          <LanguageSelector />
          <ThemeSelector />
        </div>
        <div className="auth-links-duplicate">
          <Link to="/login" className={'auth-link-duplicate ' + state.themeIndex}>
            {languages.signIn[state.languageIndex]}
          </Link>
          <Link to="/register" className={'auth-link-duplicate ' + state.themeIndex}>
            {languages.register[state.languageIndex]}
          </Link>
        </div>
        <div>
          <h2 className={'welcome-page-title ' + state.themeIndex}>
            {languages.welcome[state.languageIndex]}
          </h2>

          <div className="auth-links">
            <Link to="/login" className={'auth-link ' + state.themeIndex}>
              {languages.signIn[state.languageIndex]}
              <span className={'auth-link-arrow ' + state.themeIndex}>❯</span>
            </Link>
            <Link to="/register" className={'auth-link ' + state.themeIndex}>
              {languages.register[state.languageIndex]}
              <span className={'auth-link-arrow ' + state.themeIndex}>❯</span>
            </Link>
          </div>
        </div>

        <div className={'welcome-page-content ' + state.themeIndex}>
          <h4 className={'content-title ' + state.themeIndex}>
            {languages.about[state.languageIndex]}
          </h4>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
