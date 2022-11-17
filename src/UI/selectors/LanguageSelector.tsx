import React from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setLanguage } from '../../redux/settings-slice/settingsSlise';
import './selectors.css';

function LanguageSelector(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlise);
  const dispatch = useAppDispatch();

  return (
    <select
      className={'select ' + state.themeIndex}
      value={state.languageIndex}
      onChange={(event) => dispatch(setLanguage(Number(event.target.value)))}
    >
      <option className={'option ' + state.themeIndex} value={0}>
        EN
      </option>
      <option className={'option ' + state.themeIndex} value={1}>
        UA
      </option>
      <option className={'option ' + state.themeIndex} value={2}>
        BY
      </option>
      <option className={'option ' + state.themeIndex} value={3}>
        RU
      </option>
    </select>
  );
}

export default LanguageSelector;
