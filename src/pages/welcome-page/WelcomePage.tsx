import React from 'react';
import { localeEN } from '../../locales/localeEN';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div>
      WelcomePage
      <Link to="/login" className="">
        {localeEN.FORM_LINK_LOGIN}
      </Link>
      <Link to="/register" className="">
        {localeEN.FORM_LINK_LOGIN}
      </Link>
    </div>
  );
}
