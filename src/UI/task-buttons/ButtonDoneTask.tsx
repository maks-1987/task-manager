import React from 'react';
import { setCurrentColumnId, setEditedTaskId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setIsEditTask, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { doneTaskSVG, editTaskSVG } from './svgButtons';
import './task-buttons.css';

interface IProp {
  id: string;
  columnId: string;
}
export const ButtonDoneTask = (props: IProp) => {
  const { id, columnId } = props;

  const dispatch = useAppDispatch();

  // const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   dispatch(setIsEditTask(true));
  //   dispatch(setModalOpen(true));
  //   dispatch(setEditedTaskId(e.currentTarget.id));
  //   dispatch(setCurrentColumnId(columnId));
  // };
  return (
    <>
      <button
        id={id}
        className="button-done-task"
        // onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
      >
        {doneTaskSVG()}
      </button>
    </>
  );
};
