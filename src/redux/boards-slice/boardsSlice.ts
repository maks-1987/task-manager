import { IUserBoard, IFetchQuery } from './../../types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';

export const fetchGetUserBoards = createAsyncThunk<IUserBoard[], string, { rejectValue: string }>(
  'fetch/fetchGetUserBoards',
  async (token, { rejectWithValue }) => {
    const response: Response = await fetch(Endpoints.BOARDS, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // const userBoards = await response.json();
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }

    const userBoards: IUserBoard[] = await response.json();
    return userBoards;
  }
);

export const fetchAddNewUserBoard = createAsyncThunk<
  IUserBoard,
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchAddNewUserBoard', async (dataForFetch, { rejectWithValue }) => {
  const response: Response = await fetch(Endpoints.BOARDS, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${dataForFetch.token}`,
    },
    body: JSON.stringify(dataForFetch.boardData),
  });

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
  }

  const userBoards: IUserBoard = await response.json();
  return userBoards;
});

export const fetchRemoveUserBoard = createAsyncThunk<
  IFetchQuery,
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchRemoveUserBoard', async (dataForFetch, { rejectWithValue }) => {
  const response: Response = await fetch(`${Endpoints.BOARDS}/${dataForFetch.boardId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${dataForFetch.token}`,
    },
  });

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
  }
  return dataForFetch;
});

interface IBoardsSlice {
  board: IUserBoard;
  userBoards: IUserBoard[];
  isLoading: boolean;
  errorMessage: string;
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
};
export const boardsSlice = createSlice({
  name: 'borads',
  initialState,
  reducers: {
    // setBoards(state, action: PayloadAction<IPreBoard>) {
    //   state.boards = [...state.boards, action.payload];
    // },
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
      });
  },
});
// export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
