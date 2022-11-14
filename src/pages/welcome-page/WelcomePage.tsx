import React from 'react';
import { Link } from 'react-router-dom';
import { languages } from '../../locales/languages';
import LanguageSelector from '../../UI/global-modal/LanguageSelector/LanguageSelector';
import './welcomePage.css';

function WelcomePage() {
  return (
    <>
      <div className="welcome-page-container">
        <div className="language-selector-wrapper">
          <LanguageSelector />
        </div>
        <div className="auth-links">
          <Link to="/login" className="auth-link">
            {languages.signIn[0]}
          </Link>
          <Link to="/register" className="auth-link">
            {languages.register[1]}
          </Link>
        </div>
        <div className="welcome-page-content">bla-bla-bla...</div>
      </div>
    </>
  );
}

export default WelcomePage;
