import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import Loader from '../../components/loader/Loader';
import { localeEN } from '../../locales/localeEN';
import { fetchGetAllUserColumns } from '../../redux/columns-slice/columnsFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IComleteColumn, IFetchQuery } from '../../types/types';
import { ButtonNewColumn } from '../../UI/column-buttons/ButtonNewColumn';
import './singleBoard.css';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

export default function SingleBoard() {
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const token = useAppSelector((state) => state.userSlice.token);
  const isLoading = useAppSelector((state) => state.columnsSlice.isLoading);
  const userCompleteColumns = useAppSelector((state) => state.columnsSlice.userCompleteColumns);
  const fetchColumnErrorMessage = useAppSelector((state) => state.columnsSlice.errorMessage);
  const [columnState, setColumnState] = useState<IComleteColumn[]>(userCompleteColumns);

  useMemo(() => {
    const dataForFetch: IFetchQuery = {
      boardId: currentBoardId,
      token,
    };
    dispatch(fetchGetAllUserColumns(dataForFetch));
  }, [currentBoardId, dispatch, token]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    console.log(result);
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(columnState);
      newColumnOrder.splice(source.index, 1);
      const [draggableElem] = columnState.filter((column) => column.id === draggableId);

      newColumnOrder.splice(destination.index, 0, draggableElem);
      setColumnState(newColumnOrder);
      console.log(newColumnOrder);
      // TODO: change order in new columns
      // TODO: dispatch to the server new columns
      // dispatch(columnsSlice.actions.fetch)
    }
  };

  return (
    <main className="project-board">
      <Link className="project-board__link" to="/">
        <span>↩</span>To boards page
      </Link>
      <h2 className="project-board__title">Board title</h2>
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
                {!columnState.length
                  ? localeEN.columnContet.HAVE_NOT_COLUMN_MESSAGE
                  : columnState.map((column, index) => (
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
