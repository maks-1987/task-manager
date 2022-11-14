import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  setLanguage,
  selectedEN,
  selectedUA,
  selectedBY,
  selectedRU,
} from '../../../redux/settings-slice/settingsSlise';
import './languageSelector.css';

function LanguageSelector(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlise);
  const dispatch = useAppDispatch();

  return (
    <select
      className="select"
      onChange={(event) => dispatch(setLanguage(Number(event.target.value)))}
    >
      <option
        className="option"
        value={0}
        selected={state.selectedEN}
        onClick={() => dispatch(selectedEN())}
      >
        EN
      </option>
      <option
        className="option"
        value={1}
        selected={state.selectedUA}
        onClick={() => dispatch(selectedUA())}
      >
        UA
      </option>
      <option
        className="option"
        value={2}
        selected={state.selectedBY}
        onClick={() => dispatch(selectedBY())}
      >
        BY
      </option>
      <option
        className="option"
        value={3}
        selected={state.selectedRU}
        onClick={() => dispatch(selectedRU())}
      >
        RU
      </option>
    </select>
  );
}

export default LanguageSelector;
