import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import './goWelcomePageLink.css';

function GoWelcomePageBtn(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlice);

  return (
    <Link className={'to-welcome-page-btn ' + state.themeIndex} to="/">
      TM
    </Link>
  );
}

export default GoWelcomePageBtn;
