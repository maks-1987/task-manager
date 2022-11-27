import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { sxSelect, inputProps, sxMenuItem, selectItemsColors } from './muiSelectorStyles';
import { setTheme } from '../../redux/settings-slice/settingsSlise';
import { lightIcon, darkIcon, colorIcon } from '../../pages/welcome-page/svg';
import './selectors.css';

function ThemeSelector(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlise);
  const dispatch = useAppDispatch();

  const selectItemsColor = selectItemsColors[state.themeIndex as keyof typeof selectItemsColors];

  return (
    <Select
      className={'select ' + state.themeIndex}
      value={state.themeIndex}
      onChange={(event) => dispatch(setTheme(event.target.value))}
      IconComponent={() => null}
      sx={sxSelect}
      inputProps={inputProps(selectItemsColor)}
    >
      <MenuItem className={'option ' + state.themeIndex} value="light" sx={sxMenuItem}>
        <svg
          className={'option-icon ' + state.themeIndex}
          width="26px"
          height="26px"
          viewBox="0 0 24 24"
        >
          {lightIcon()}
        </svg>
      </MenuItem>
      <MenuItem className={'option ' + state.themeIndex} value="dark" sx={sxMenuItem}>
        <svg
          className={'option-icon ' + state.themeIndex}
          width="23px"
          height="23px"
          viewBox="10 -10 550 550"
        >
          {darkIcon()}
        </svg>
      </MenuItem>
      <MenuItem className={'option ' + state.themeIndex} value="color" sx={sxMenuItem}>
        <svg
          className={'option-icon ' + state.themeIndex}
          width="26px"
          height="26px"
          viewBox="0 0 24 24"
        >
          {colorIcon()}
        </svg>
      </MenuItem>
    </Select>
  );
}

export default ThemeSelector;
