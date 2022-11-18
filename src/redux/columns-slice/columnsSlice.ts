import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAddNewUserColumns,
  fetchChangeOrderColumn,
  fetchChangeUserColumn,
  fetchGetAllUserColumns,
  fetchRemoveUserColumn,
} from './columnsFetchRequest';
import { IComleteColumn } from './../../types/types';

interface IColumnsSlice {
  column: IComleteColumn;
  userCompleteColumns: IComleteColumn[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: IColumnsSlice = {
  column: {
    id: '',
    title: '',
    order: 1,
    tasks: [],
  },
  userCompleteColumns: [],
  isLoading: true,
  errorMessage: '',
};
export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllUserColumns.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(fetchGetAllUserColumns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCompleteColumns = action.payload;
        state.errorMessage = '';
      })
      .addCase(fetchAddNewUserColumns.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(fetchAddNewUserColumns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCompleteColumns.push(action.payload);
        state.errorMessage = '';
      })
      .addCase(fetchRemoveUserColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCompleteColumns = state.userCompleteColumns.filter(
          (column) => column.id !== action.payload.columnId
        );
        state.errorMessage = '';
      })
      .addCase(fetchChangeUserColumn.fulfilled, (state, action) => {
        const filteredColumns = state.userCompleteColumns.filter(
          (column) => column.id !== action.payload.id
        );
        state.userCompleteColumns = [...filteredColumns, action.payload];
      })
      .addCase(fetchChangeOrderColumn.fulfilled, (state, action) => {
        const filteredColumns = state.userCompleteColumns.filter(
          (column) => column.id !== action.payload.id
        );
        state.userCompleteColumns = [...filteredColumns, action.payload];
        // state.userCompleteColumns = state.userCompleteColumns.map((col) => {
        //   return {
        //     ...col,
        //     order: action.payload.order,
        //   };
        // });
        console.log(action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});
export default columnsSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
