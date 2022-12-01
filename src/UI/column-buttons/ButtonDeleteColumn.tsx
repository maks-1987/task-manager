import React from 'react';
import { localeEN } from '../../locales/localeEN';
import { setRemovedColumnId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsRemoveColumn, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { IComleteColumn } from '../../types/types';
import { deleteColumnSVG } from './svgButtons';
interface IProp {
  column: IComleteColumn;
}
export const ButtonDeleteColumn = (props: IProp) => {
  const { id, title } = props.column;
  const dispatch = useAppDispatch();
  const languageIndex = useAppSelector((state) => state.settingsSlise.languageIndex);

  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsRemoveColumn(true));
    dispatch(setModalOpen(true));
    dispatch(setRemovedColumnId(e.currentTarget.id));
  };
  return (
    <>
      <button
        disabled={localeEN.columnContet.DEFAULT_DONE_COLUMN.some((lang) => lang === title)}
        id={id}
        className="button-delete-column"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
      >
        {deleteColumnSVG()}
      </button>
    </>
  );
};
