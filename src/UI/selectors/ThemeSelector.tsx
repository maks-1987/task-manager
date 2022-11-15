import React from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setTheme } from '../../redux/settings-slice/settingsSlise';
import './selectors.css';

function ThemeSelector(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlise);
  const dispatch = useAppDispatch();

  return (
    <select
      className="select"
      value={state.themeIndex}
      onChange={(event) => dispatch(setTheme(event.target.value))}
    >
      <option className={'option  option-' + state.themeIndex} value="light">
        Light
      </option>
      <option className="option" value="dark">
        Dark
      </option>
      <option className="option" value="retro">
        Retro
      </option>
    </select>
  );
}

export default ThemeSelector;
