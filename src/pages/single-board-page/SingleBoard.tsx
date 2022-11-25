import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import Loader from '../../components/loader/Loader';
import { localeEN } from '../../locales/localeEN';
import {
  fetchChangeOrderColumn,
  fetchGetAllUserColumns,
} from '../../redux/columns-slice/columnsFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IColumn, IFetchQuery, ITask, JwtDecode } from '../../types/types';
import { ButtonNewColumn } from '../../UI/column-buttons/ButtonNewColumn';
import './singleBoard.css';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { setColumnsAfterDrag, setTasksAfterDrag } from '../../redux/columns-slice/columnsSlice';
import { fetchChangeOrderTask } from '../../redux/columns-slice/tasksFetchRequest';
import jwtDecode from 'jwt-decode';

export default function SingleBoard() {
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const token = useAppSelector((state) => state.userSlice.token);
  const isLoading = useAppSelector((state) => state.columnsSlice.isLoading);
  const userCurrentBoard = useAppSelector((state) => state.columnsSlice.userCurrentBoard);
  const fetchColumnErrorMessage = useAppSelector((state) => state.columnsSlice.errorMessage);
  const [columnState, setColumnState] = useState<IColumn[]>(userCurrentBoard.columns);
  const { user } = useAppSelector((state) => state.userSlice);
  const jwt_decode: JwtDecode = jwtDecode(token);
  const userId = jwt_decode.userId;

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
      const [draggableElem] = columnState.filter((column) => column.id === draggableId);
      newColumnOrder.splice(destination.index, 0, draggableElem);
      const newArrCol = newColumnOrder.map((col, index) => {
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
      });
      dispatch(setColumnsAfterDrag(newArrCol));
    }

    if (type === 'task') {
      const startColumn = userCurrentBoard.columns.find(
        (column) => column.id === source.droppableId
      );
      const finishColumn = userCurrentBoard.columns.find(
        (column) => column.id === destination.droppableId
      );

      if (startColumn === finishColumn && startColumn !== undefined) {
        const newTaskArray = Array.from(startColumn.tasks);
        // console.log(newTaskArray);
        newTaskArray.splice(source.index, 1);
        const [draggableTask] = startColumn?.tasks.filter((task) => task.id === draggableId);
        // console.log(draggableTask);
        newTaskArray.splice(destination.index, 0, draggableTask);
        // console.log(newTaskArray);
        const orderedTaskArray = newTaskArray.map((task, index) => ({
          ...task,
          order: index + 1,
        }));
        // console.log(orderedTaskArray, destination.droppableId);
        const changeTask: ChangeTask = {
          taskArray: orderedTaskArray,
          destinationId: destination.droppableId,
        };
        // dispatch(setTasksAfterDrag(changeTask));
        orderedTaskArray.map((task) => {
          const dataForFetch: IFetchQuery = {
            boardId: userCurrentBoard.id,
            columnId: destination.droppableId,
            taskId: task.id,
            token: token,
            taskData: task,
            userId: userId,
          };
          dispatch(fetchChangeOrderTask(dataForFetch));
        });
        dispatch(setTasksAfterDrag(changeTask));
      }
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

export type ChangeTask = {
  taskArray: ITask[];
  destinationId: string;
};
