import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import Loader from '../../components/loader/Loader';
import { localeEN } from '../../locales/localeEN';
import { fetchGetAllUserColumns } from '../../redux/columns-slice/columnsFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IColumn, IFetchQuery } from '../../types/types';
import { ButtonNewColumn } from '../../UI/column-buttons/ButtonNewColumn';
import './singleBoard.css';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

export default function SingleBoard() {
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const token = useAppSelector((state) => state.userSlice.token);
  const isLoading = useAppSelector((state) => state.columnsSlice.isLoading);
  const userCurrentBoard = useAppSelector((state) => state.columnsSlice.userCurrentBoard);
  const fetchColumnErrorMessage = useAppSelector((state) => state.columnsSlice.errorMessage);
  const [columnState, setColumnState] = useState<IColumn[]>(userCurrentBoard.columns);
  const { user } = useAppSelector((state) => state.userSlice);

  useMemo(() => {
    const dataForFetch: IFetchQuery = {
      boardId: currentBoardId,
      token,
    };
    dispatch(fetchGetAllUserColumns(dataForFetch));
  }, [currentBoardId, dispatch, token]);

  useEffect(() => {
    setColumnState(userCurrentBoard.columns);
  }, [userCurrentBoard.columns]);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <main className="project-board">
      <Link className="project-board__link" to={`/boards/${user.login}`}>
        <span>↩</span>To boards page
      </Link>
      {isLoading && <Loader />}
      <h2 className="project-board__title">{userCurrentBoard.title}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <article className="project-board__columns">
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <section
                className="project-board__columns-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Boolean(fetchColumnErrorMessage) && (
                  <h2 className="fetch-erroe-message">{localeEN.errors.FETCH_ERRORS_MESSAGE}</h2>
                )}
                {!columnState?.length
                  ? localeEN.columnContet.HAVE_NOT_COLUMN_MESSAGE
                  : userCurrentBoard.columns.map((column, index) => (
                      <Column key={column.id} column={column} index={index} />
                    ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
          <ButtonNewColumn />
        </article>
      </DragDropContext>
    </main>
  );
}
