import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import Loader from '../../components/loader/Loader';
import { localeEN } from '../../locales/localeEN';
import { fetchGetAllUserColumns } from '../../redux/columns-slice/columnsFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IFetchQuery } from '../../types/types';
import { ButtonNewColumn } from '../../UI/column-buttons/ButtonNewColumn';
import './singleBoard.css';

export default function SingleBoard() {
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const token = useAppSelector((state) => state.userSlice.token);
  const isLoading = useAppSelector((state) => state.columnsSlice.isLoading);
  const userCurrentBoard = useAppSelector((state) => state.columnsSlice.userCurrentBoard);
  const fetchColumnErrorMessage = useAppSelector((state) => state.columnsSlice.errorMessage);

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
      {isLoading && <Loader />}
      <h2 className="project-board__title">{userCurrentBoard.title}</h2>
      <article className="project-board__columns">
        <section className="project-board__columns-list">
          {Boolean(fetchColumnErrorMessage) && (
            <h2 className="fetch-erroe-message">{localeEN.errors.FETCH_ERRORS_MESSAGE}</h2>
          )}
          {!userCurrentBoard.columns?.length
            ? localeEN.columnContet.HAVE_NOT_COLUMN_MESSAGE
            : userCurrentBoard.columns.map((column) => <Column key={column.id} column={column} />)}
        </section>
        <ButtonNewColumn />
      </article>
    </main>
  );
}
