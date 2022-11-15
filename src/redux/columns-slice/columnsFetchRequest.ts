import { IComleteBoard } from '../../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';

export const fetchGetAllUserColumns = createAsyncThunk<
  IComleteBoard[],
  string,
  { rejectValue: string }
>('fetch/fetchGetUserBoards', async (token, { rejectWithValue }) => {
  const response: Response = await fetch(Endpoints.BOARDS`${}/columns`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
  }

  const userBoards: IComleteBoard[] = await response.json();
  return userBoards;
});
