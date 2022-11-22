import React from 'react';
import { ITask } from '../../types/types';
import { ButtonDeleteTask } from '../../UI/task-buttons/ButtonDeleteTask';

import './task.css';
interface IProp {
  task: ITask;
}
export const Task = (props: IProp) => {
  const { id, order, title, description } = props.task;
  return (
    <div className="task" id={id} style={{ order: `${order}` }}>
      <p>{`${title}`}</p>
      <p>{`${description}`}</p>
      <ButtonDeleteTask id={id} />
    </div>
  );
};
