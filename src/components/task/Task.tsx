import React from 'react';
import { IComleteColumn, ITask } from '../../types/types';
import { ButtonDeleteTask } from '../../UI/task-buttons/ButtonDeleteTask';
import { ButtonDoneTask } from '../../UI/task-buttons/ButtonDoneTask';
import { ButtonEditTask } from '../../UI/task-buttons/ButtonEditTask';

import './task.css';
import { Draggable } from 'react-beautiful-dnd';

interface IProp {
  task: ITask;
  columnId: string;
  index: number;
  column: IComleteColumn;
}

export const Task = (props: IProp) => {
  const { id, order, title, description } = props.task;
  return (
    <Draggable draggableId={id} index={props.index}>
      {(provided) => (
        <div
          className="task"
          id={id}
          style={{ order: `${order}` }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="task_contetnt-block">
            <h3 className="task__title">{`${title}`}</h3>
            <div className="task__description">
              <p className="task__description_content">{`${description}`}</p>
            </div>
          </div>
          <div className="task_buton-block">
            <ButtonEditTask id={id} task={props.task} column={props.columnId} />
            <ButtonDeleteTask id={id} columnId={props.column} />
            <ButtonDeleteTask id={id} column={props.column} />
          </div>
        </div>
      )}
    </Draggable>
  );
};
