import * as React from 'react';
import { localeEN } from '../../locales/localeEN';
import './loginPage.css';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <p className="">{localeEN.FORM_BUTTON_LOGIN}</p>
      <div className="">
        <label htmlFor="login">Login</label>
        <input type="text" id="login" required />
      </div>
      <div className="">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
      </div>
      <div className="">
        <Link to="/register" className="">
          {localeEN.FORM_LINK_REGISTRATION}
        </Link>
        <button type="submit" className="">
          {localeEN.FORM_BUTTON_LOGIN}
        </button>
      </div>
    </form>
  );
};
