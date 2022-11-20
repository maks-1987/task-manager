import React, { useMemo, useState } from 'react';
import { Task } from '../task/Task';
import './column.css';
import { ButtonDeleteColumn } from '../../UI/column-buttons/ButtonDeleteColumn';
import { ButtonNewTask } from '../../UI/column-buttons/ButtonNewTask';
import { IComleteColumn, IFetchQuery } from '../../types/types';
import { localeEN } from '../../locales/localeEN';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchChangeUserColumn } from '../../redux/columns-slice/columnsFetchRequest';
import { fetchGetAllUserTasks } from '../../redux/columns-slice/tasksFetchRequest';
interface IProp {
  column: IComleteColumn;
}
export const Column = (props: IProp) => {
  const { id, title, order, tasks } = props.column;
  const [columnTitle, setColumnTitle] = useState(title);
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const token = useAppSelector((state) => state.userSlice.token);

  const handleTitle = (event: React.FormEvent<HTMLInputElement>) => {
    setColumnTitle(event.currentTarget.value);
  };

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
    dispatch(fetchGetAllUserTasks(dataForFetch));
  }, [currentBoardId, dispatch, id, token]);
  return (
    <>
      <div className="column-item" id={id} style={{ order: `${order}` }}>
        <div className="column-item__control">
          <input
            className="column-item__title"
            type="text"
            value={columnTitle}
            placeholder={`${localeEN.tooTipContent.CANNOT_BE_EMPTY_PLACEHOLDER_MESSAGE}`}
            onChange={handleTitle}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => changeColumnTitleHandler(e)}
          />
          <ButtonNewTask id={id} />
          <ButtonDeleteColumn id={id} />
        </div>
        <section className="task-list">
          {tasks?.length === 0 ? (
            <span className="column-item__message">
              {localeEN.columnContet.HAVE_NOT_TASK_MESSAGE}
            </span>
          ) : (
            tasks?.map((task) => <Task key={task.id} />)
          )}
        </section>

        <p className="column-item__add-task">
          <ButtonNewTask id={id} />
          Add new task
        </p>
      </div>
    </>
  );
};
