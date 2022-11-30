import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { languages } from '../../locales/languages';
import GoWelcomePageLink from '../../UI/go-welcome-page-link/GoWelcomePageLink';
import './notFoundPage.css';

function NotFoundPage() {
  const state = useAppSelector((store) => store.settingsSlise);
  return (
    <div className={'not-found-page-container ' + state.themeIndex}>
      <div className={'return-link-container ' + state.themeIndex}>
        <GoWelcomePageLink />
      </div>
      <h3 className={'not-found-page-code ' + state.themeIndex}>404</h3>
      <h3 className={'not-found-page-title ' + state.themeIndex}>
        {languages.notFoundPage[state.languageIndex]}
      </h3>
    </div>
  );
}

export default NotFoundPage;
