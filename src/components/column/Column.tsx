import React, { useEffect, useState } from 'react';
import { Task } from '../task/Task';
import './column.css';
import { ButtonDeleteColumn } from '../../UI/column-buttons/ButtonDeleteColumn';
import { ButtonNewTask } from '../../UI/column-buttons/ButtonNewTask';
import { IColumn, IComleteColumn, IFetchQuery } from '../../types/types';
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
  doneColumnData: IColumn;
  index: number;
}

export const Column = (props: IProp) => {
  const { id, title, order, tasks } = props.column;
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const isLoading = useAppSelector((state) => state.columnsSlice.isLoading);
  const token = useAppSelector((state) => state.userSlice.token);
  const languageIndex = useAppSelector((state) => state.settingsSlise.languageIndex);
  const userCurrentBoardList = useAppSelector((state) => state.columnsSlice.userCurrentBoardList);
  const [done, setDone] = useState<IColumn>({
    id: '',
    title: '',
    order: 0,
    tasks: [],
  });

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

  useEffect(() => {
    const dataForFetch: IFetchQuery = {
      boardId: currentBoardId,
      columnId: id,
      token,
    };
    dispatch(fetchGetUserColumnByID(dataForFetch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      const doneColumn: IColumn | undefined =
        typeof props.doneColumnData !== 'undefined'
          ? props.doneColumnData
          : userCurrentBoardList
              .filter((board) => board.id === currentBoardId)
              .at(-1)
              ?.columns.filter(
                (column) =>
                  column.title ===
                  localeEN.columnContet.DEFAULT_DONE_COLUMN.filter(
                    (title) => title === column.title
                  )[0]
              )
              .at(-1);
      setDone(doneColumn!);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userCurrentBoardList]);

  useEffect(() => {
    setTimeout(() => {
      const doneColumn: IColumn | undefined =
        typeof props.doneColumnData !== 'undefined'
          ? props.doneColumnData
          : userCurrentBoardList
              .filter((board) => board.id === currentBoardId)
              .at(-1)
              ?.columns.filter(
                (column) =>
                  column.title ===
                  localeEN.columnContet.DEFAULT_DONE_COLUMN.filter(
                    (title) => title === column.title
                  )[0]
              )
              .at(-1);
      setDone(doneColumn!);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, languageIndex]);

  useEffect(() => {
    setTimeout(
      () =>
        done.id
          ? dispatch(
              fetchChangeUserColumn({
                columnData: {
                  ...done,
                  title: localeEN.columnContet.DEFAULT_DONE_COLUMN[languageIndex],
                },
                boardId: currentBoardId,
                columnId: done.id,
                token,
              })
            )
          : null,
      200
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, done, languageIndex]);
  return (
    <>
      <Draggable draggableId={id} index={props.index}>
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
              {localeEN.columnContet.DEFAULT_DONE_COLUMN.some((lang) => lang === title) ? (
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
            <Droppable droppableId={id} type="task">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <section className="task-list">
                    {isLoading && <Loader />}
                    {tasks?.length === 0 ? (
                      <span className="column-item__message">
                        {localeEN.columnContet.DEFAULT_DONE_COLUMN.some((lang) => lang === title)
                          ? localeEN.columnContet.HAVE_NOT_TASK_DONE_MESSAGE[languageIndex]
                          : localeEN.columnContet.HAVE_NOT_TASK_MESSAGE[languageIndex]}
                      </span>
                    ) : (
                      tasks?.map((task, index) => (
                        <Task key={task.id} task={task} index={index} column={props.column} />
                      ))
                    )}
                  </section>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <p
              className={`${
                title === localeEN.columnContet.DEFAULT_DONE_COLUMN[languageIndex]
                  ? 'column-item__add-task_disabled'
                  : 'column-item__add-task'
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
