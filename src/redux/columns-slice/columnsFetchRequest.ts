import { IFetchQuery } from './../../types/types';
import { IComleteBoard } from '../../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';

export const fetchGetAllUserColumns = createAsyncThunk<
  IComleteBoard[],
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchGetAllUserColumns', async (dataForFetch, { rejectWithValue }) => {
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

  const userColumn: IComleteBoard[] = await response.json();
  return userColumn;
});

export const fetchAddNewUserColumns = createAsyncThunk<
  IComleteBoard,
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchAddNewUserColumns', async (dataForFetch, { rejectWithValue }) => {
  console.log(dataForFetch);
  console.log(`${Endpoints.BOARDS}/${dataForFetch.boardId}/columns`);
  const response: Response = await fetch(`${Endpoints.BOARDS}/${dataForFetch.boardId}/columns`, {
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

  const newUserBoards: IComleteBoard = await response.json();
  return newUserBoards;
});
