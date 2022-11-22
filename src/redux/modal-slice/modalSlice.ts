import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitState = {
  isModalOpen: boolean;
  isRemoveBoard: boolean;
  isRemoveColumn: boolean;
  isRemoveTask: boolean;
  isCreateColumn: boolean;
  isCreateTask: boolean;
  isCreateBoard: boolean;
};

const initState: InitState = {
  isModalOpen: false,
  isRemoveBoard: false,
  isRemoveColumn: false,
  isRemoveTask: false,
  isCreateColumn: false,
  isCreateTask: false,
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
    setIsCreateColumn(state, action: PayloadAction<boolean>) {
      state.isCreateColumn = action.payload;
    },
    setIsRemoveColumn(state, action: PayloadAction<boolean>) {
      state.isRemoveColumn = action.payload;
    },
    setIsCreateTask(state, action: PayloadAction<boolean>) {
      state.isCreateTask = action.payload;
    },
    setIsRemoveTask(state, action: PayloadAction<boolean>) {
      state.isRemoveTask = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const {
  setModalOpen,
  setIsRemoveBoard,
  setIsRemoveColumn,
  setIsRemoveTask,
  setIsCreateTask,
  setIsCreateColumn,
  setIsCreateBoard,
} = modalSlice.actions;
