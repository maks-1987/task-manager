import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import { localeEN } from '../../locales/localeEN';
import { fetchChangeOrderColumn } from '../../redux/columns-slice/columnsFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ChangeTask, IColumn, IFetchQuery, JwtDecode } from '../../types/types';
import { ButtonNewColumn } from '../../UI/column-buttons/ButtonNewColumn';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import TaskProgressBar from '../../components/task-progress-bar/TaskProgressBar';
import {
  columnsSlice,
  setColumnsAfterDrag,
  setCurrentColumnId,
  setIsBoardPageOpen,
  setIsSingleBoardPage,
  setTasksAfterDrag,
} from '../../redux/columns-slice/columnsSlice';
import {
  fetchChangeColumnTask,
  fetchChangeOrderTask,
} from '../../redux/columns-slice/tasksFetchRequest';
import jwtDecode from 'jwt-decode';
import Spinner from '../../UI/spinner/Spinner';
import './singleBoard.css';

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
    dispatch(setIsSingleBoardPage(true));
    dispatch(setIsBoardPageOpen(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      dispatch(setCurrentColumnId(startColumn!.id));
      const finishColumn = userCurrentBoard.columns.find(
        (column) => column.id === destination.droppableId
      );

      if (startColumn === finishColumn && startColumn !== undefined) {
        const newTaskArray = Array.from(startColumn.tasks);

        newTaskArray.splice(source.index, 1);
        const [draggableTask] = startColumn?.tasks.filter((task) => task.id === draggableId);
        newTaskArray.splice(destination.index, 0, draggableTask);
        const orderedTaskArray = newTaskArray.map((task, index) => ({
          ...task,
          order: index + 1,
        }));

        const changeTask: ChangeTask = {
          taskArray: orderedTaskArray,
          destinationId: destination.droppableId,
        };

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
        return;
      }

      if (startColumn !== finishColumn && startColumn !== undefined && finishColumn !== undefined) {
        const [draggableTask] = startColumn?.tasks.filter((task) => task.id === draggableId);

        const startTaskArray = Array.from(startColumn.tasks);
        startTaskArray.splice(source.index, 1);
        const orderedStartTaskArray = startTaskArray.map((task, index) => ({
          ...task,
          order: index + 1,
        }));

        orderedStartTaskArray.map((task) => {
          const dataForFetch: IFetchQuery = {
            boardId: userCurrentBoard.id,
            columnId: source.droppableId,
            taskId: task.id,
            token: token,
            taskData: task,
            userId: userId,
            newColumn: source.droppableId,
          };
          dispatch(fetchChangeOrderTask(dataForFetch));
        });

        dispatch(
          columnsSlice.actions.setNewTasksByColumn({
            tasks: orderedStartTaskArray,
            columnId: source.droppableId,
          })
        );

        const finishTaskArray = Array.from(finishColumn.tasks);
        finishTaskArray.splice(destination.index, 0, draggableTask);
        const orderedFinishTaskArray = finishTaskArray.map((task, index) => ({
          ...task,
          order: index + 1,
        }));

        orderedFinishTaskArray.map((task) => {
          const dataForFetch: IFetchQuery = {
            boardId: userCurrentBoard.id,
            columnId: destination.droppableId,
            taskId: task.id,
            token: token,
            taskData: task,
            userId: userId,
          };

          if (task.id === draggableId) {
            dispatch(
              fetchChangeColumnTask({
                ...dataForFetch,
                columnId: source.droppableId,
                newColumn: destination.droppableId,
              })
            );
          }
        });

        dispatch(
          columnsSlice.actions.setNewTasksByColumn({
            tasks: orderedFinishTaskArray,
            columnId: destination.droppableId,
          })
        );
      }
    }
  };

  useEffect(
    () => () => {
      dispatch(setIsSingleBoardPage(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <main className="project-board">
      <Link className="project-board__link" to={`/boards/${user.login}`}>
        <span>↩</span>To boards page
      </Link>
      {isLoading && <Spinner />}
      <h2 className="project-board__title">{userCurrentBoard.title}</h2>
      <TaskProgressBar boardId={currentBoardId!} />
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
