import * as React from 'react';
import { useState } from 'react';
import { SignIn } from '../../components/sign-in/SignIn';
import { SignUp } from '../../components/sign-up/SignUp';
import './loginPage.css';

export const LoginPage = () => {
  const [logIn, setLogIn] = useState(true);

  const switchForms = (isClick: boolean) => setLogIn(isClick);

  return (
    <div className="login-container container">
      {logIn ? <SignIn switchForm={switchForms} /> : <SignUp switchForm={switchForms} />}
    </div>
  );
};
