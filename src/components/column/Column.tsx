import React, { useEffect } from 'react';
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
import Spinner from '../../UI/spinner/Spinner';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface IProp {
  column: IComleteColumn;
  index: number;
}

export const Column = (props: IProp) => {
  const { id, title, order, tasks } = props.column;
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const isTaskLoading = useAppSelector((state) => state.columnsSlice.isTaskLoading);
  const currentColumnId = useAppSelector((state) => state.columnsSlice.currentColumnId);
  const token = useAppSelector((state) => state.userSlice.token);
  const { languageIndex, themeIndex } = useAppSelector((state) => state.settingsSlice);

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
    setTimeout(() => {
      const dataForFetch: IFetchQuery = {
        boardId: currentBoardId,
        columnId: id,
        token,
      };
      dispatch(fetchGetUserColumnByID(dataForFetch));
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Draggable draggableId={id} index={props.index}>
        {(provided) => (
          <div
            className={'column-item ' + themeIndex}
            id={id}
            style={{ order: `${order}` }}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <hr {...provided.dragHandleProps} />
            <div className={'column-item__control ' + themeIndex}>
              {localeEN.columnContet.DEFAULT_DONE_COLUMN.some((lang) => lang === title) ? (
                <h3 className="column-item__title">{title}</h3>
              ) : (
                <input
                  className="column-item__title"
                  type="text"
                  defaultValue={title}
                  placeholder={
                    localeEN.tooTipContent.CANNOT_BE_EMPTY_PLACEHOLDER_MESSAGE[languageIndex]
                  }
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
                <div
                  className={'column-item__task-container ' + themeIndex}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <section className="task-list">
                    {currentColumnId === id && isTaskLoading && <Spinner />}
                    {tasks?.length === 0 ? (
                      <span className={'column-item__message ' + themeIndex}>
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
              className={
                localeEN.columnContet.DEFAULT_DONE_COLUMN.some((lang) => lang === title)
                  ? 'column-item__add-task_disabled'
                  : 'column-item__add-task ' + themeIndex
              }
            >
              <ButtonNewTask column={props.column} />
              {localeEN.columnContet.DEFAULT_DONE_COLUMN.some((lang) => lang === title)
                ? null
                : 'Add task'}
            </p>
          </div>
        )}
      </Draggable>
    </>
  );
};
