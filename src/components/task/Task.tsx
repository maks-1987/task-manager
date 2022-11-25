import React from 'react';
import { ITask } from '../../types/types';
import { ButtonDeleteTask } from '../../UI/task-buttons/ButtonDeleteTask';
import { ButtonDoneTask } from '../../UI/task-buttons/ButtonDoneTask';
import { ButtonEditTask } from '../../UI/task-buttons/ButtonEditTask';

import './task.css';
interface IProp {
  task: ITask;
  columnId: string;
}
export const Task = (props: IProp) => {
  const { id, order, title, description } = props.task;
  return (
    <div className="task" id={id} style={{ order: `${order}` }}>
      <div className="task__contetnt-block">
        <h3 className="task__title">{`${title}`}</h3>
        <div className="task__description">
          <p className="task__description_content">{`${description}`}</p>
        </div>
      </div>
      <div className="task_button-block">
        <ButtonDoneTask id={id} columnId={props.columnId} />
        <ButtonEditTask id={id} columnId={props.columnId} />
        <ButtonDeleteTask id={id} columnId={props.columnId} />
      </div>
    </div>
  );
};
