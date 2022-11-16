import { createSlice } from '@reduxjs/toolkit';
import { fetchAddNewUserColumns, fetchGetAllUserColumns } from './columnsFetchRequest';
import { IComleteBoard } from './../../types/types';
interface IColumnsSlice {
  column: IComleteBoard;
  userCompleteColumns: IComleteBoard[];
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
        console.log(action.payload);
        state.isLoading = false;
        state.userCompleteColumns.push(action.payload);
        state.errorMessage = '';
      });
  },
});
// export const { setRemovedBoardId } = boardsSlice.actions;
export default columnsSlice.reducer;
