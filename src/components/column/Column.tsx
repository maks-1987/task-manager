import React, { useMemo } from 'react';
import { Task } from '../task/Task';
import './column.css';
import { ButtonDeleteColumn } from '../../UI/column-buttons/ButtonDeleteColumn';
import { ButtonNewTask } from '../../UI/column-buttons/ButtonNewTask';
import { IComleteColumn, IFetchQuery } from '../../types/types';
import { localeEN } from '../../locales/localeEN';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchChangeUserColumn,
  fetchGetUserColumnByID,
} from '../../redux/columns-slice/columnsFetchRequest';
import Loader from '../loader/Loader';
import { Draggable } from 'react-beautiful-dnd';

interface IProp {
  column: IComleteColumn;
  index: number;
}

export const Column = (props: IProp) => {
  const { id, title, order, tasks } = props.column;
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const isLoading = useAppSelector((state) => state.columnsSlice.isLoading);
  const token = useAppSelector((state) => state.userSlice.token);

  const changeColumnTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const dataForFetch: IFetchQuery = {
      columnData: { id, title: e.currentTarget.value, order },
      boardId: currentBoardId,
      columnId: id,
      token,
    };
    e.currentTarget.value.length === 0
      ? null
      : setTimeout(() => dispatch(fetchChangeUserColumn(dataForFetch)), 1000);
  };
  useMemo(() => {
    const dataForFetch: IFetchQuery = {
      boardId: currentBoardId,
      columnId: id,
      token,
    };
    dispatch(fetchGetUserColumnByID(dataForFetch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);
  return (
    <>
      <Draggable draggableId={id!} index={props.index}>
        {(provided) => (
          <div
            className="column-item"
            id={id}
            style={{ order: `${order}` }}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <hr {...provided.dragHandleProps} />
            <div className="column-item__control">
              {title === 'done' ? (
                <h3 className="column-item__title">{title}</h3>
              ) : (
                <input
                  className="column-item__title"
                  type="text"
                  defaultValue={title}
                  placeholder={`${localeEN.tooTipContent.CANNOT_BE_EMPTY_PLACEHOLDER_MESSAGE}`}
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    changeColumnTitleHandler(e)
                  }
                />
              )}

              <ButtonNewTask column={props.column} />
              <ButtonDeleteColumn column={props.column} />
            </div>
            <section className="task-list">
              {isLoading && <Loader />}
              {tasks?.length === 0 ? (
                <span className="column-item__message">
                  {title === 'done'
                    ? localeEN.columnContet.HAVE_NOT_TASK_DONE_MESSAGE
                    : localeEN.columnContet.HAVE_NOT_TASK_MESSAGE}
                </span>
              ) : (
                tasks?.map((task) => <Task key={task.id} task={task} column={props.column} />)
              )}
            </section>

            <p
              className={`${
                title === 'done' ? 'column-item__add-task_disabled' : 'column-item__add-task'
              }`}
            >
              <ButtonNewTask column={props.column} />
              Add task
            </p>
          </div>
        )}
      </Draggable>
    </>
  );
};
