import { createSlice } from '@reduxjs/toolkit';
import { fetchGetAllUserColumns } from './columnsFetchRequest';
import { IComleteBoard } from './../../types/types';
interface IColumnsSlice {
  column: IComleteBoard;
  userComleteColumns: IComleteBoard[];
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
  userComleteColumns: [],
  isLoading: true,
  errorMessage: '',
};
export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllUserColumns.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
  },
});
// export const { setRemovedBoardId } = boardsSlice.actions;
export default columnsSlice.reducer;
