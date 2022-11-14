import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// language indexes: EN=0, UA=1, BY=2, RU=3;

type ISettingsState = {
  languageIndex: number;
};

const settingsState: ISettingsState = {
  languageIndex: 0,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsState,
  reducers: {
    setLanguage(state, action: PayloadAction<number>): void {
      state.languageIndex = action.payload;
    },
  },
});

export const { setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
