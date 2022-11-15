import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitState = {
  isModalOpen: boolean;
  isRemoveBoard: boolean;
  isCreateColumnOrTask: boolean;
  isCreateBoard: boolean;
};

const initState: InitState = {
  isModalOpen: false,
  isRemoveBoard: false,
  isCreateColumnOrTask: false,
  isCreateBoard: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setIsCreateBoard(state, action: PayloadAction<boolean>) {
      state.isCreateBoard = action.payload;
    },
    setIsRemoveBoard(state, action: PayloadAction<boolean>) {
      state.isRemoveBoard = action.payload;
    },
    setIsCreateColumnOrTask(state, action: PayloadAction<boolean>) {
      state.isCreateColumnOrTask = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { setModalOpen, setIsRemoveBoard, setIsCreateColumnOrTask, setIsCreateBoard } =
  modalSlice.actions;
