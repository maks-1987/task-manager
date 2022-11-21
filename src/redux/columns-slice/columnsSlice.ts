import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAddNewUserColumns,
  fetchChangeUserColumn,
  fetchGetAllUserColumns,
  fetchGetUserBoardByID,
  fetchGetUserColumnByID,
  fetchRemoveUserColumn,
} from './columnsFetchRequest';
import { IBoard } from './../../types/types';
import { fetchAddNewUserTasks } from './tasksFetchRequest';
interface IColumnsSlice {
  userCurrentBoard: IBoard;
  isLoading: boolean;
  errorMessage: string;
  currentColumnId: string;
}
const initialState: IColumnsSlice = {
  userCurrentBoard: {
    id: '',
    title: '',
    description: '',
    columns: [],
  },
  isLoading: true,
  errorMessage: '',
  currentColumnId: '',
};
export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setCurrentColumnId(state, action: PayloadAction<string>) {
      state.currentColumnId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUserBoardByID.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(fetchGetUserBoardByID.fulfilled, (state, action) => {
        state.userCurrentBoard = action.payload;
        state.isLoading = false;
        state.errorMessage = '';
      })
      .addCase(fetchGetAllUserColumns.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(fetchGetAllUserColumns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCurrentBoard.columns = action.payload;
        state.errorMessage = '';
      })
      .addCase(fetchGetUserColumnByID.fulfilled, (state, action) => {
        const filteredColumns = state.userCurrentBoard.columns.filter(
          (column) => column.id !== action.payload.id
        );
        state.userCurrentBoard.columns = [...filteredColumns, action.payload];
        state.isLoading = false;
        state.errorMessage = '';
      })
      .addCase(fetchAddNewUserColumns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCurrentBoard.columns.push(action.payload);
        state.errorMessage = '';
      })
      .addCase(fetchRemoveUserColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCurrentBoard.columns = state.userCurrentBoard.columns.filter(
          (column) => column.id !== action.payload.columnId
        );
        state.errorMessage = '';
      })
      .addCase(fetchChangeUserColumn.fulfilled, (state, action) => {
        state.userCurrentBoard.columns = state.userCurrentBoard.columns.map((column) => {
          return {
            ...column,
            title: column.id === action.payload.id ? action.payload.title : column.title,
          };
        });
      })
      .addCase(fetchAddNewUserTasks.fulfilled, (state, action) => {
        state.userCurrentBoard.columns.forEach((column) => {
          column.id === action.payload.columnId && column.tasks?.push(action.payload);
        });
        state.isLoading = false;
        state.errorMessage = '';
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});
export const { setCurrentColumnId } = columnsSlice.actions;
export default columnsSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
