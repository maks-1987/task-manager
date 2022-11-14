import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setLanguage } from '../../../redux/settings-slice/settingsSlise';
import './languageSelector.css';

function LanguageSelector(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlise);
  const dispatch = useAppDispatch();

  return (
    <select
      className="select"
      value={state.languageIndex}
      onChange={(event) => dispatch(setLanguage(Number(event.target.value)))}
    >
      <option className="option" value={0}>
        EN
      </option>
      <option className="option" value={1}>
        UA
      </option>
      <option className="option" value={2}>
        BY
      </option>
      <option className="option" value={3}>
        RU
      </option>
    </select>
  );
}

export default LanguageSelector;
