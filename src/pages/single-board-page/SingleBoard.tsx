import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import { localeEN } from '../../locales/localeEN';
import {
  fetchChangeOrderColumn,
  fetchGetAllUserColumns,
} from '../../redux/columns-slice/columnsFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ChangeTask, IColumn, IFetchQuery, JwtDecode } from '../../types/types';
import { ButtonNewColumn } from '../../UI/column-buttons/ButtonNewColumn';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import TaskProgressBar from '../../components/task-progress-bar/TaskProgressBar';
import { setColumnsAfterDrag, setTasksAfterDrag } from '../../redux/columns-slice/columnsSlice';
import {
  fetchAddNewUserTasks,
  fetchChangeOrderTask,
  fetchRemoveUserTask,
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

        const removeTask: IFetchQuery = {
          boardId: userCurrentBoard.id,
          columnId: source.droppableId,
          token,
          taskId: draggableId,
        };

        const addTask: IFetchQuery = {
          boardId: userCurrentBoard.id,
          columnId: destination.droppableId,
          token,
          taskData: {
            title: draggableTask.title,
            description: draggableTask.description,
            userId,
          },
        };

        dispatch(fetchRemoveUserTask(removeTask));
        dispatch(fetchAddNewUserTasks(addTask));

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
          };
          dispatch(fetchChangeOrderTask(dataForFetch));
        });

        const finishTaskArray = Array.from(finishColumn.tasks);
        finishTaskArray.splice(destination.index, 0, draggableTask);
        const orderedFinishTaskArray = finishTaskArray.map((task, index) => ({
          ...task,
          order: index + 1,
        }));

        orderedFinishTaskArray.map((task) => {
          if (task.id === draggableId) return;

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
      }
    }
  };

  return (
    <main className="project-board">
      <Link className="project-board__link" to={`/boards/${user.login}`}>
        <span>↩</span>To boards page
      </Link>
      {isLoading && <Spinner />}
      <h2 className="project-board__title">{userCurrentBoard.title}</h2>
      <TaskProgressBar />
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
