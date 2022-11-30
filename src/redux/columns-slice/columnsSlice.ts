import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAddNewUserColumns,
  fetchChangeOrderColumn,
  fetchChangeUserColumn,
  fetchGetAllUserColumns,
  fetchGetUserBoardByID,
  fetchGetUserColumnByID,
  fetchRemoveUserColumn,
} from './columnsFetchRequest';
import { IBoard, IColumn, ITask, ChangeTask, IFiles } from './../../types/types';
import {
  fetchAddNewUserTasks,
  fetchChangeOrderTask,
  fetchChangeUserTask,
  fetchRemoveUserTask,
} from './tasksFetchRequest';

interface IColumnsSlice {
  userCurrentBoard: IBoard;
  isLoading: boolean;
  errorMessage: string;
  currentColumnId: string;
  removedColumnId: string;
  removedTaskId: string;
  editedTaskId: string;
  editedTaskData: ITask;
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
  removedColumnId: '',
  removedTaskId: '',
  editedTaskId: '',
  editedTaskData: {
    id: '',
    title: '',
    order: 1,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
    files: [],
  },
};
export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setCurrentColumnId(state, action: PayloadAction<string>) {
      state.currentColumnId = action.payload;
    },
    setRemovedColumnId(state, action: PayloadAction<string>) {
      state.removedColumnId = action.payload;
    },
    setRemovedTaskId(state, action: PayloadAction<string>) {
      state.removedTaskId = action.payload;
    },
    setEditedTaskId(state, action: PayloadAction<string>) {
      state.editedTaskId = action.payload;
      const allTasks = state.userCurrentBoard.columns.map((column) => column.tasks).flat();
      state.editedTaskData = allTasks.find((task) => task.id === state.editedTaskId)!;
    },
    setColumnsAfterDrag(state, action: PayloadAction<IColumn[]>) {
      state.userCurrentBoard.columns = action.payload;
    },
    setResetCurrentBoardData(state) {
      state.userCurrentBoard.id = '';
      state.userCurrentBoard.columns = [];
      state.removedTaskId = '';
      state.editedTaskId = '';
      state.removedColumnId = '';
      state.currentColumnId = '';
    },
    setTasksAfterDrag(state, action: PayloadAction<ChangeTask>) {
      state.userCurrentBoard.columns.map((column) => {
        column.id === action.payload.destinationId
          ? (column.tasks = action.payload.taskArray)
          : column.tasks;
      });
    },
    setFiles(state, action: PayloadAction<IFiles>) {
      state.editedTaskData.files?.push(action.payload);
    },
    setNewTasksByColumn(state, action: PayloadAction<{ tasks: ITask[]; columnId: string }>) {
      // state.userCurrentBoard.columns[0].tasks = action.payload;
      const [column] = state.userCurrentBoard.columns.filter(
        (column) => column.id === action.payload.columnId
      );
      column.tasks = action.payload.tasks;
      console.log(column.tasks);
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
        state.errorMessage = '';
        action.payload.sort((a, b) => (a.order < b.order ? -1 : 1));
        state.userCurrentBoard.columns = action.payload;
      })
      .addCase(fetchGetUserColumnByID.fulfilled, (state, action) => {
        const filteredColumns = state.userCurrentBoard.columns.filter(
          (column) => column.id !== action.payload.id
        );
        state.userCurrentBoard = {
          ...state.userCurrentBoard,
          columns: [...filteredColumns, action.payload],
        };
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
      .addCase(fetchRemoveUserTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCurrentBoard.columns = state.userCurrentBoard.columns.map((column) => {
          return {
            ...column,
            tasks:
              column.id === action.payload.columnId
                ? [...column.tasks?.filter((task) => task.id !== action.payload.taskId)]
                : column.tasks,
          };
        });
        state.isLoading = false;
        state.errorMessage = '';
      })
      .addCase(fetchChangeUserTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCurrentBoard.columns = state.userCurrentBoard.columns.map((column) => {
          return {
            ...column,
            tasks:
              column.id === action.payload.columnId
                ? [
                    ...column.tasks?.map((task) => {
                      return {
                        ...task,
                        title: task.id === action.payload.id ? action.payload.title : task.title,
                        description:
                          task.id === action.payload.id
                            ? action.payload.description
                            : task.description,
                        order: task.id === action.payload.id ? action.payload.order : task.order,
                      };
                    }),
                  ]
                : column.tasks,
          };
        });
        state.isLoading = false;
        state.errorMessage = '';
      })
      .addCase(fetchChangeOrderColumn.pending, (state) => {
        state.isLoading = false;
        state.errorMessage = '';
      })
      .addCase(fetchChangeOrderColumn.fulfilled, (state) => {
        state.isLoading = false;
        state.errorMessage = '';
      })
      .addCase(fetchChangeOrderTask.fulfilled, (state) => {
        state.isLoading = false;
        state.errorMessage = '';
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});
export const {
  setCurrentColumnId,
  setRemovedColumnId,
  setRemovedTaskId,
  setEditedTaskId,
  setColumnsAfterDrag,
  setResetCurrentBoardData,
  setTasksAfterDrag,
} = columnsSlice.actions;
export default columnsSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
