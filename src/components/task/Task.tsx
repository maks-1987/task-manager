import React from 'react';
import { ITask } from '../../types/types';
import { ButtonDeleteTask } from '../../UI/task-buttons/ButtonDeleteTask';
import { ButtonEditTask } from '../../UI/task-buttons/ButtonEditTask';

import './task.css';
import { Draggable } from 'react-beautiful-dnd';

interface IProp {
  task: ITask;
  columnId: string;
  index: number;
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
          <div className="task_contetnt">
            <p>order {order}</p>
            <p>id: {id}</p>
            <p>{`${title}`}</p>
            <p>{`${description}`}</p>
          </div>
          <div className="task_buton-block">
            <ButtonEditTask id={id} columnId={props.columnId} />
            <ButtonDeleteTask id={id} columnId={props.columnId} />
          </div>
        </div>
      )}
    </Draggable>
  );
};
