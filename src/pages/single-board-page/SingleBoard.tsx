import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import Loader from '../../components/loader/Loader';
import { localeEN } from '../../locales/localeEN';
import { fetchGetAllUserColumns } from '../../redux/columns-slice/columnsFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IFetchQuery } from '../../types/types';
import { ButtonNewColumn } from '../../UI/buttons/ButtonNewColumn';
import './singleBoard.css';

export default function SingleBoard() {
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const token = useAppSelector((state) => state.userSlice.token);
  const isLoading = useAppSelector((state) => state.columnsSlice.isLoading);
  const userComleteColumns = useAppSelector((state) => state.columnsSlice.userComleteColumns);

  useMemo(() => {
    const dataForFetch: IFetchQuery = {
      boardId: currentBoardId,
      token,
    };
    dispatch(fetchGetAllUserColumns(dataForFetch));
  }, [currentBoardId, dispatch, token]);
  return (
    <main className="project-board">
      <Link className="project-board__link" to="/">
        <span>↩</span>To welcome page
      </Link>
      <h2 className="project-board__title">Board title</h2>
      <article className="project-board__columns">
        {isLoading && <Loader />}
        {!userComleteColumns.length
          ? localeEN.columnContet.HAVE_NOT_COLUMN_MESSAGE
          : userComleteColumns.map((column, index) => <Column key={column.id} />)}
        <ButtonNewColumn />
      </article>
    </main>
  );
}
