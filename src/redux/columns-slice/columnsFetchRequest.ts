import { IFetchQuery, IComleteColumn } from './../../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';

export const fetchGetAllUserColumns = createAsyncThunk<
  IComleteColumn[],
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

  const userColumn: IComleteColumn[] = await response.json();
  return userColumn;
});

export const fetchAddNewUserColumns = createAsyncThunk<
  IComleteColumn,
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

  const newUserBoards: IComleteColumn = await response.json();
  return newUserBoards;
});

export const fetchRemoveUserColumn = createAsyncThunk<
  IFetchQuery,
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchRemoveUserBoard', async (dataForFetch, { rejectWithValue }) => {
  const response: Response = await fetch(
    `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${dataForFetch.token}`,
      },
    }
  );

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
  }
  return dataForFetch;
});

export const fetchChangeUserColumn = createAsyncThunk<IComleteColumn, IFetchQuery>(
  'fetch/fetchChangeUserColumn',
  async (dataForFetch, { rejectWithValue }) => {
    const response: Response = await fetch(
      `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnData?.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${dataForFetch.token}`,
        },
        body: JSON.stringify(dataForFetch.boardData),
      }
    );

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }
    const newColumn = (await response.json()) as IComleteColumn;
    return newColumn;
  }
);
