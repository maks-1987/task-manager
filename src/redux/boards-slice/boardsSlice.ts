import { IUserBoard, IFetchQuery } from './../../types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const fetchChangeUserBoard = createAsyncThunk<IUserBoard, IFetchQuery>(
  'fetch/fetchChangeUserBoard',
  async (dataForFetch, { rejectWithValue }) => {
    const response: Response = await fetch(`${Endpoints.BOARDS}/${dataForFetch.boardId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${dataForFetch.token}`,
      },
      body: JSON.stringify(dataForFetch.boardData),
    });

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }
    const newData = (await response.json()) as IUserBoard;
    return newData;
  }
);

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
        const filteredBoards = state.userBoards.filter((board) => board.id !== action.payload.id);
        state.userBoards = [...filteredBoards, action.payload];
      });
  },
});
export const { setRemovedBoardId, setCurrentBoardId } = boardsSlice.actions;
export default boardsSlice.reducer;
