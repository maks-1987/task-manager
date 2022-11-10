import { IPreBoard } from './../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IBoardsSlice {
  board: IPreBoard;
  boards: IPreBoard[];
}
const initialState: IBoardsSlice = {
  board: {
    id: '',
    title: '',
    description: '',
  },
  boards: [],
};
export const boardsSlice = createSlice({
  name: 'borads',
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<IPreBoard>) {
      state.boards = [...state.boards, action.payload];
    },
  },
});
export const { setBoards } = boardsSlice.actions;
export default boardsSlice.reducer;
