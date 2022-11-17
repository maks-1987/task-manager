import React from 'react';
import { fetchRemoveUserColumn } from '../../redux/columns-slice/columnsFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IFetchQuery } from '../../types/types';
import { deleteColumnSVG } from './svgButtons';
interface IProp {
  id: string;
}
export const ButtonDeleteColumn = (props: IProp) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const token = useAppSelector((state) => state.userSlice.token);

  const removeColumnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataForFetch: IFetchQuery = {
      boardId: currentBoardId,
      columnId: e.currentTarget.id,
      token,
    };
    dispatch(fetchRemoveUserColumn(dataForFetch));
  };
  return (
    <>
      <button
        id={id}
        className="button-delete-column"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => removeColumnHandler(e)}
      >
        {deleteColumnSVG()}
      </button>
    </>
  );
};
