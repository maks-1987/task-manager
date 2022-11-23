import React from 'react';
import { ITask } from '../../types/types';
import { ButtonDeleteTask } from '../../UI/task-buttons/ButtonDeleteTask';
import { ButtonEditTask } from '../../UI/task-buttons/ButtonEditTask';

import './task.css';
interface IProp {
  task: ITask;
}
export const Task = (props: IProp) => {
  const { id, order, title, description } = props.task;
  return (
    <div className="task" id={id} style={{ order: `${order}` }}>
      <div className="task_contetnt">
        <p>{`${title}`}</p>
        <p>{`${description}`}</p>
      </div>
      <div className="task_buton-block">
        <ButtonEditTask id={id} />
        <ButtonDeleteTask id={id} />
      </div>
    </div>
  );
};
