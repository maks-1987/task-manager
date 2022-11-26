import React from 'react';
import { setCurrentColumnId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setModalOpen, setIsCreateTask } from '../../redux/modal-slice/modalSlice';
import { IComleteColumn } from '../../types/types';
import './buttons.css';
import { addTaskSVG } from './svgButtons';
interface IProp {
  column: IComleteColumn;
}
export const ButtonNewTask = (props: IProp) => {
  const { id, title } = props.column;
  const dispatch = useAppDispatch();
  const addTasksButtonHandler = () => {
    dispatch(setCurrentColumnId(id));
    dispatch(setModalOpen(true));
    dispatch(setIsCreateTask(true));
  };
  return (
    <button
      disabled={title === 'done'}
      onClick={addTasksButtonHandler}
      className="button-new-task"
      title="add new task"
    >
      {addTaskSVG()}
    </button>
  );
};
