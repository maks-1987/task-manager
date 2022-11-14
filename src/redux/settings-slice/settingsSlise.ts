import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// language indexes: EN=0, UA=1, BY=2, RU=3;

type ISettingsState = {
  languageIndex: number;
  selectedEN: boolean;
  selectedUA: boolean;
  selectedBY: boolean;
  selectedRU: boolean;
};

const settingsState: ISettingsState = {
  languageIndex: 0,
  selectedEN: true,
  selectedUA: false,
  selectedBY: false,
  selectedRU: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsState,
  reducers: {
    setLanguage(state, action: PayloadAction<number>): void {
      state.languageIndex = action.payload;
    },
    selectedEN(state): void {
      state.selectedEN = true;
      state.selectedUA = false;
      state.selectedBY = false;
      state.selectedRU = false;
    },
    selectedUA(state): void {
      state.selectedEN = false;
      state.selectedUA = true;
      state.selectedBY = false;
      state.selectedRU = false;
    },
    selectedBY(state): void {
      state.selectedEN = false;
      state.selectedUA = false;
      state.selectedBY = true;
      state.selectedRU = false;
    },
    selectedRU(state): void {
      state.selectedEN = false;
      state.selectedUA = false;
      state.selectedBY = false;
      state.selectedRU = true;
    },
  },
});

export const { setLanguage, selectedEN, selectedUA, selectedBY, selectedRU } =
  settingsSlice.actions;

export default settingsSlice.reducer;
