import React from 'react';
import { setCurrentColumnId, setEditedTaskId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setIsEditTask, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { IComleteColumn } from '../../types/types';
import { EditTaskSVG } from './svgButtons';
import './task-buttons.css';

interface IProp {
  id: string;
  column: IComleteColumn;
}

export const ButtonEditTask = (props: IProp) => {
  const { id } = props;

  const dispatch = useAppDispatch();

  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsEditTask(true));
    dispatch(setModalOpen(true));
    dispatch(setEditedTaskId(e.currentTarget.id));
    dispatch(setCurrentColumnId(props.column.id));
  };
  return (
    <>
      <button
        disabled={props.column.title === 'done'}
        id={id}
        className="button-edit-task"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
      >
        <EditTaskSVG />
      </button>
    </>
  );
};
