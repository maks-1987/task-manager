import React from 'react';
import { localeEN } from '../../locales/localeEN';
import { setCurrentColumnId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
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
  const languageIndex = useAppSelector((state) => state.settingsSlise.languageIndex);

  const addTasksButtonHandler = () => {
    dispatch(setCurrentColumnId(id));
    dispatch(setModalOpen(true));
    dispatch(setIsCreateTask(true));
  };
  return (
    <button
      disabled={title === localeEN.columnContet.DEFAULT_DONE_COLUMN[languageIndex]}
      onClick={addTasksButtonHandler}
      className="button-new-task"
      title="add new task"
    >
      {addTaskSVG()}
    </button>
  );
};
