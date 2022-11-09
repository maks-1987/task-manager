import * as React from 'react';
import { Link } from 'react-router-dom';
import { localeEN } from '../../locales/localeEN';
import './registerPage.css';

export const RegisterPage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <p className="sign-up-form__title">{localeEN.FORM_TITLE_REGISTRATION}</p>
      <div className="sign-up-form__item username">
        <label htmlFor="username">Name</label>
        <input type="text" id="username" required />
      </div>
      <div className="sign-up-form__item login">
        <label htmlFor="login">Login</label>
        <input type="text" id="login" required />
      </div>
      <div className="sign-up-form__item password">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
      </div>
      <div className="sign-up-form__item buttons">
        <Link to="/login" className="">
          {localeEN.FORM_LINK_LOGIN}
        </Link>
        <button type="submit" className="">
          {localeEN.FORM_BUTTON_REGISTRATION}
        </button>
      </div>
    </form>
  );
};
