import { IUserBoard } from './../../types/types';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchGetUserBoards,
  fetchAddNewUserBoard,
  fetchRemoveUserBoard,
  fetchChangeUserBoard,
} from './boardsFechRequest';

interface IBoardsSlice {
  board: IUserBoard;
  userBoards: IUserBoard[];
  isLoading: boolean;
  errorMessage: string;
  removedBoardId: string;
  currentBoardId: string;
}
const initialState: IBoardsSlice = {
  board: {
    id: '',
    title: '',
    description: '',
  },
  userBoards: [],
  isLoading: true,
  errorMessage: '',
  removedBoardId: '',
  currentBoardId: '',
};
export const boardsSlice = createSlice({
  name: 'borads',
  initialState,
  reducers: {
    setRemovedBoardId(state, action: PayloadAction<string>) {
      state.removedBoardId = action.payload;
    },
    setCurrentBoardId(state, action: PayloadAction<string>) {
      state.currentBoardId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUserBoards.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(fetchGetUserBoards.fulfilled, (state, action) => {
        state.userBoards = action.payload;
        state.isLoading = false;
        state.errorMessage = '';
      })
      .addCase(fetchAddNewUserBoard.fulfilled, (state, action) => {
        state.userBoards.push(action.payload);
      })
      .addCase(fetchRemoveUserBoard.fulfilled, (state, action) => {
        state.userBoards = state.userBoards.filter((board) => board.id !== action.payload.boardId);
      })
      .addCase(fetchChangeUserBoard.fulfilled, (state, action) => {
        state.userBoards = state.userBoards.map((board) => {
          return {
            ...board,
            title: action.payload.title,
            description: action.payload.description,
          };
        });
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});
export const { setRemovedBoardId, setCurrentBoardId } = boardsSlice.actions;
export default boardsSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
