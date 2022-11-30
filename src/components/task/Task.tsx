import React, { useRef, useState } from 'react';
import { IComleteColumn, ITask } from '../../types/types';
import { ButtonDeleteTask } from '../../UI/task-buttons/ButtonDeleteTask';
import { ButtonDoneTask } from '../../UI/task-buttons/ButtonDoneTask';
import { ButtonEditTask } from '../../UI/task-buttons/ButtonEditTask';

import './task.css';
import { Draggable } from 'react-beautiful-dnd';
import { useAppSelector } from '../../redux/hooks';

interface IProp {
  task: ITask;
  index: number;
  column: IComleteColumn;
}

export const Task = (props: IProp) => {
  const { token } = useAppSelector((state) => state.userSlice);
  const { id, order, title, description } = props.task;
  const [file, setFile] = useState<File>();
  const fileBtn = useRef<HTMLInputElement | null>(null);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.currentTarget.files![0]);
  };

  const handleLoadFile = () => {
    fileBtn.current?.click();
  };

  const handleFetch = async () => {
    const formData = new FormData();
    formData.append('taskId', id);
    formData.append('file', file as string | Blob);
    console.log(formData.get('file'));

    const response = await fetch(`https://be-taskmanager.up.railway.app/file`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
  };

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
          <div className="task__content-block">
            <h3 className="task__title">{title}</h3>
            <div className="task__description">
              <p className="task__description_content">{`${description}`}</p>
              <span>{id}</span>
            </div>
          </div>
          <div className="task_button-block">
            <ButtonDoneTask id={id} task={props.task} column={props.column} />
            <ButtonEditTask id={id} column={props.column} />
            <ButtonDeleteTask id={id} column={props.column} />
            {/*<button onClick={handleLoadFile}>file</button>*/}
            {/*<input*/}
            {/*  type="file"*/}
            {/*  onChange={(event) => handleFile(event)}*/}
            {/*  ref={fileBtn}*/}
            {/*  className="vis-hidden"*/}
            {/*  accept="image/*"*/}
            {/*/>*/}
            {/*<button onClick={handleFetch}>send</button>*/}
            {/*<div>{file?.name}</div>*/}
          </div>
        </div>
      )}
    </Draggable>
  );
};
