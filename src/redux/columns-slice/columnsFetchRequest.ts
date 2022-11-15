import { IFetchQuery } from './../../types/types';
import { IComleteBoard } from '../../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';

export const fetchGetAllUserColumns = createAsyncThunk<
  IComleteBoard[],
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchGetAllUserBoards', async (dataForFetch, { rejectWithValue }) => {
  console.log(dataForFetch);
  const response: Response = await fetch(`${Endpoints.BOARDS}/${dataForFetch.boardId}/columns`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${dataForFetch.token}`,
    },
  });

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
  }

  const userBoards: IComleteBoard[] = await response.json();
  return userBoards;
});
