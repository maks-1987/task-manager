import React from 'react';
import { setRemovedTaskId } from '../../redux/columns-slice/columnsSlice';

import { useAppDispatch } from '../../redux/hooks';
import { setIsRemoveTask, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { deleteColumnSVG } from '../column-buttons/svgButtons';

interface IProp {
  id: string;
}

export const ButtonDeleteTask = (props: IProp) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsRemoveTask(true));
    dispatch(setModalOpen(true));
    dispatch(setRemovedTaskId(e.currentTarget.id));
  };
  return (
    <>
      <button
        id={id}
        className="button-delete-column"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
      >
        {deleteColumnSVG()}
      </button>
    </>
  );
};
