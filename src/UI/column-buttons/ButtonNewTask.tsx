import React from 'react';
import { setCurrentColumnId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setModalOpen, setIsCreateTask } from '../../redux/modal-slice/modalSlice';
import './buttons.css';
import { addTaskSVG } from './svgButtons';
interface IProp {
  id: string;
}
export const ButtonNewTask = (props: IProp) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const addTasksButtonHandler = () => {
    dispatch(setCurrentColumnId(id));
    dispatch(setModalOpen(true));
    dispatch(setIsCreateTask(true));
  };
  return (
    <button onClick={addTasksButtonHandler} className="button-new-task" title="add new task">
      {addTaskSVG()}
    </button>
  );
};
