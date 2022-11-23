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
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface IProp {
  column: IComleteColumn;
  index: number;
}

export const Column = (props: IProp) => {
  const { _id, title, order, tasks } = props.column;
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const token = useAppSelector((state) => state.userSlice.token);

  const changeColumnTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const dataForFetch: IFetchQuery = {
      columnData: { _id, title: e.currentTarget.value, order },
      boardId: currentBoardId,
      columnId: _id,
      token,
    };
    e.currentTarget.value.length === 0
      ? null
      : setTimeout(() => dispatch(fetchChangeUserColumn(dataForFetch)), 1000);
  };
  useMemo(() => {
    const dataForFetch: IFetchQuery = {
      boardId: currentBoardId,
      columnId: _id,
      token,
    };
    dispatch(fetchGetUserColumnByID(dataForFetch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, _id]);

  return (
    <>
      <Draggable draggableId={_id!} index={props.index}>
        {(provided) => (
          <div
            className="column-item"
            id={_id}
            style={{ order: `${order}` }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p>{_id}</p>
            <div className="column-item__control">
              <input
                className="column-item__title"
                type="text"
                defaultValue={title}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => changeColumnTitleHandler(e)}
              />
              <ButtonNewTask id={_id!} />
              <ButtonDeleteColumn id={_id!} />
            </div>
            <section className="task-list">
              {tasks?.length === 0 ? (
                <span className="column-item__message">
                  {localeEN.columnContet.HAVE_NOT_TASK_MESSAGE}
                </span>
              ) : (
                tasks?.map((task) => <Task key={task.id} task={task} />)
              )}
            </section>
            <p className="column-item__add-task">
              <ButtonNewTask id={_id!} />
              Add new task
            </p>
          </div>
        )}
      </Draggable>
    </>
  );
};
