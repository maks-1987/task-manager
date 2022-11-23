import React from 'react';
import { setRemovedColumnId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsRemoveColumn, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { deleteColumnSVG } from './svgButtons';

interface IProp {
  id: string;
}

export const ButtonDeleteColumn = (props: IProp) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsRemoveColumn(true));
    dispatch(setModalOpen(true));
    dispatch(setRemovedColumnId(e.currentTarget.id));
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
