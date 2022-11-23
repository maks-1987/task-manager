import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import Loader from '../../components/loader/Loader';
import { localeEN } from '../../locales/localeEN';
import {
  fetchChangeOrderColumn,
  fetchGetAllUserColumns,
} from '../../redux/columns-slice/columnsFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IColumn, IComleteColumn, IFetchQuery } from '../../types/types';
import { ButtonNewColumn } from '../../UI/column-buttons/ButtonNewColumn';
import './singleBoard.css';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { columnsSlice } from '../../redux/columns-slice/columnsSlice';

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
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(columnState);
      newColumnOrder.splice(source.index, 1);
      const [draggableElem] = columnState.filter((column) => column._id === draggableId);
      newColumnOrder.splice(destination.index, 0, draggableElem);
      const newArrCol: IColumn[] = newColumnOrder.map((col, index) => {
        return {
          ...col,
          order: index + 1,
        };
      });

      setColumnState(newArrCol);
      newArrCol.map((column, index) => {
        const dataForFetch: IFetchQuery = {
          boardId: currentBoardId,
          token,
          newOrder: index + 1,
          columnData: column,
        };
        dispatch(fetchChangeOrderColumn(dataForFetch));
        dispatch(columnsSlice.actions.setColumnsAfterDrag(newArrCol));
      });
    }
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
                {isLoading && <Loader />}
                {Boolean(fetchColumnErrorMessage) && (
                  <h2 className="fetch-erroe-message">{localeEN.errors.FETCH_ERRORS_MESSAGE}</h2>
                )}
                {!userCurrentBoard.columns?.length
                  ? localeEN.columnContet.HAVE_NOT_COLUMN_MESSAGE
                  : columnState.map((column, index) => (
                      <Column key={column._id} column={column} index={index} />
                    ))}
                {provided.placeholder}
                <ButtonNewColumn />
              </section>
            )}
          </Droppable>
        </article>
      </DragDropContext>
    </main>
  );
}
