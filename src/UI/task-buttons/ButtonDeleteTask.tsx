import React from 'react';
import { setCurrentColumnId, setRemovedTaskId } from '../../redux/columns-slice/columnsSlice';

import { useAppDispatch } from '../../redux/hooks';
import { setIsRemoveTask, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { deleteColumnSVG, deleteTaskSVG } from '../column-buttons/svgButtons';

interface IProp {
  id: string;
  columnId: string;
}

export const ButtonDeleteTask = (props: IProp) => {
  const { id, columnId } = props;
  const dispatch = useAppDispatch();

  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsRemoveTask(true));
    dispatch(setModalOpen(true));
    dispatch(setRemovedTaskId(e.currentTarget.id));
    dispatch(setCurrentColumnId(columnId));
  };
  return (
    <>
      <button
        id={id}
        className="button-delete-column"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
      >
        {deleteTaskSVG()}
      </button>
    </>
  );
};
