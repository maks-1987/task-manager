import React from 'react';
import { localeEN } from '../../locales/localeEN';
import { setCurrentColumnId, setEditedTaskId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsEditTask, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { IComleteColumn } from '../../types/types';
import { editTaskSVG } from './svgButtons';
import './task-buttons.css';

interface IProp {
  id: string;
  column: IComleteColumn;
}
export const ButtonEditTask = (props: IProp) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const languageIndex = useAppSelector((state) => state.settingsSlise.languageIndex);

  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsEditTask(true));
    dispatch(setModalOpen(true));
    dispatch(setEditedTaskId(e.currentTarget.id));
    dispatch(setCurrentColumnId(props.column.id));
  };
  return (
    <>
      <button
        disabled={props.column.title === localeEN.columnContet.DEFAULT_DONE_COLUMN[languageIndex]}
        id={id}
        className="button-edit-task"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
      >
        {editTaskSVG()}
      </button>
    </>
  );
};
