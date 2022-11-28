import React from 'react';
import { localeEN } from '../../locales/localeEN';
import { setCurrentColumnId } from '../../redux/columns-slice/columnsSlice';
import {
  fetchAddNewUserTasks,
  fetchRemoveUserTask,
} from '../../redux/columns-slice/tasksFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IComleteColumn, IFetchQuery, ITask } from '../../types/types';
import { doneTaskSVG } from './svgButtons';
import './task-buttons.css';

interface IProp {
  id: string;
  column: IComleteColumn;
  task: ITask;
}
export const ButtonDoneTask = (props: IProp) => {
  const { id } = props;
  const { title, description, userId } = props.task;
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const userCurrentBoardColumns = useAppSelector(
    (state) => state.columnsSlice.userCurrentBoard.columns
  );
  const languageIndex = useAppSelector((state) => state.settingsSlise.languageIndex);

  const doneTaskHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataForFetch: IFetchQuery = {
      boardId: currentBoardId,
      columnId: props.column.id,
      taskId: e.currentTarget.id,
      token,
    };

    dispatch(setCurrentColumnId(props.column.id));
    dispatch(fetchRemoveUserTask(dataForFetch));
    movedDoneTaskToDoneColumn();
  };

  const movedDoneTaskToDoneColumn = () => {
    const doneColumnId = userCurrentBoardColumns
      .filter((column) => column.title === localeEN.columnContet.DEFAULT_DONE_COLUMN[languageIndex])
      .at(-1)?.id;

    const dataForFetch: IFetchQuery = {
      taskData: { title, description, userId },
      boardId: currentBoardId,
      columnId: doneColumnId,
      token,
    };

    dispatch(fetchAddNewUserTasks(dataForFetch));
  };

  return (
    <>
      <button
        disabled={props.column.title === localeEN.columnContet.DEFAULT_DONE_COLUMN[languageIndex]}
        id={id}
        className="button-done-task"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => doneTaskHandler(e)}
      >
        {doneTaskSVG()}
      </button>
    </>
  );
};
