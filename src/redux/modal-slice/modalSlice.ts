import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitState = {
  isModalOpen: boolean;
  isRemoveBoard: boolean;
};

const initState: InitState = {
  isModalOpen: false,
  isRemoveBoard: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setIsRemoveBoard(state, action: PayloadAction<boolean>) {
      state.isRemoveBoard = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { setModalOpen, setIsRemoveBoard } = modalSlice.actions;
