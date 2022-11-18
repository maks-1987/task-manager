import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setModalOpen, setIsCreateTask } from '../../redux/modal-slice/modalSlice';
import './buttons.css';
import { addTaskSVG } from './svgButtons';

export const ButtonNewTask = () => {
  const dispatch = useAppDispatch();
  const addTasksButtonHandler = () => {
    dispatch(setModalOpen(true));
    dispatch(setIsCreateTask(true));
  };
  return (
    <button onClick={addTasksButtonHandler} className="button-new-task" title="add new task">
      {addTaskSVG()}
    </button>
  );
};
