import React from 'react';
import { setEditedTaskId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setIsEditTask, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { editTaskSVG } from './svgButtons';
import './task-buttons.css';

interface IProp {
  id: string;
}
export const ButtonEditTask = (props: IProp) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsEditTask(true));
    dispatch(setModalOpen(true));
    dispatch(setEditedTaskId(e.currentTarget.id));
  };
  return (
    <>
      <button
        id={id}
        className="button-edit-task"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
      >
        {editTaskSVG()}
      </button>
    </>
  );
};
