import React, { useState } from 'react';
import { Task } from '../task/Task';
import './column.css';
import { ButtonDeleteColumn } from '../../UI/column-buttons/ButtonDeleteColumn';
import { ButtonNewTask } from '../../UI/column-buttons/ButtonNewTask';
import { IComleteBoard } from '../../types/types';
import { localeEN } from '../../locales/localeEN';
interface IProp {
  column: IComleteBoard;
}
export const Column = (props: IProp) => {
  console.log(props);
  const { id, title, order, tasks } = props.column;
  const [columnTitle, setColumnTitle] = useState(title);

  const handleTitle = (event: React.FormEvent<HTMLInputElement>) => {
    setColumnTitle(event.currentTarget.value);
  };

  return (
    <>
      <div className="column-item" id={id}>
        <div className="column-item__control">
          <input
            className="column-item__title"
            type="text"
            value={columnTitle}
            onChange={handleTitle}
          />
          <ButtonNewTask />
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
          <ButtonNewTask />
          Add new task
        </p>
      </div>
    </>
  );
};
