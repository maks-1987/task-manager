import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { sxSelect, inputProps, sxMenuItem, selectItemsColors } from './muiSelectorStyles';
import { setTheme } from '../../redux/settings-slice/settingsSlise';
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
        Light
      </MenuItem>
      <MenuItem className={'option ' + state.themeIndex} value="dark" sx={sxMenuItem}>
        Dark
      </MenuItem>
      <MenuItem className={'option ' + state.themeIndex} value="color" sx={sxMenuItem}>
        Color
      </MenuItem>
    </Select>
  );
}

export default ThemeSelector;
