import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitState = {
  isModalOpen: boolean;
};

const initState: InitState = {
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
  },
});

export default modalSlice.reducer;
