import React from 'react';
import { setCurrentColumnId } from '../../redux/columns-slice/columnsSlice';
import {
  fetchAddNewUserTasks,
  fetchRemoveUserTask,
} from '../../redux/columns-slice/tasksFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IComleteColumn, IFetchQuery, ITask } from '../../types/types';
import { DoneTaskSVG } from './svgButtons';
import './task-buttons.css';

interface IProp {
  id: string;
  column: IComleteColumn;
  task: ITask;
}

export const ButtonDoneTask = (props: IProp) => {
  const { id } = props;
  const { title, description, userId } = props.task;
  const token = useAppSelector((state) => state.userSlice.token);
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const userCurrentBoardColumns = useAppSelector(
    (state) => state.columnsSlice.userCurrentBoard.columns
  );
  const dispatch = useAppDispatch();

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
      .filter((column) => column.title === 'done')
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
        disabled={props.column.title === 'done'}
        id={id}
        className="button-done-task"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => doneTaskHandler(e)}
      >
        <DoneTaskSVG />
      </button>
    </>
  );
};
