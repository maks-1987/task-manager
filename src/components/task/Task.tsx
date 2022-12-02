import React, { useEffect, useRef, useState } from 'react';
import { IComleteColumn, ITask } from '../../types/types';
import { ButtonDeleteTask } from '../../UI/task-buttons/ButtonDeleteTask';
import { ButtonDoneTask } from '../../UI/task-buttons/ButtonDoneTask';
import { ButtonEditTask } from '../../UI/task-buttons/ButtonEditTask';

import './task.css';
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Endpoints } from '../../endpoints/endpoints';
import { DefaultTaskIcon } from '../../UI/column-buttons/svgButtons';

interface IProp {
  task: ITask;
  index: number;
  column: IComleteColumn;
}

export const Task = (props: IProp) => {
  const { token } = useAppSelector((state) => state.userSlice);
  const { id, order, title, description } = props.task;
  const [file, setFile] = useState<File>();
  const [returnedFile, setReturnedFile] = useState<Blob>();
  const [error, setError] = useState('');
  const fileBtn = useRef<HTMLInputElement | null>(null);
  const { files } = props.task;

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.currentTarget.files![0]);
    await handleFetch(event.currentTarget.files![0]);
  };

  const handleLoadFile = () => {
    fileBtn.current?.click();
  };

  const handleFetch = async (files: File) => {
    const formData = new FormData();
    formData.append('taskId', id);
    formData.append('file', files as string | File);

    const response = await fetch(`${Endpoints.FILE}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      const result = await response.json();
      setError(result.message);
    }

    const responseFile = await fetch(`${Endpoints.FILE}/${id}/${files.name}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (responseFile.ok) {
      const data = await responseFile.blob();
      setReturnedFile(data);
    }
  };

  const getFile = async () => {
    const responseFile = await fetch(`${Endpoints.FILE}/${props.task.id}/${files![0].filename}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!responseFile.ok) {
      const data = await responseFile.json();
      setError(data.message);
    }
    const data = await responseFile.blob();
    setReturnedFile(data);
  };

  useEffect(() => {
    if (files?.length) getFile();
  }, []);

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
            </div>
          </div>
          <div className="task_button-block">
            <ButtonDoneTask id={id} task={props.task} column={props.column} />
            <ButtonEditTask id={id} column={props.column} />
            <ButtonDeleteTask id={id} column={props.column} />

            <button onClick={handleLoadFile}>file</button>
            <input
              type="file"
              onChange={handleFile}
              ref={fileBtn}
              className="vis-hidden"
              accept="image/*"
            />
            {!returnedFile ? (
              <span className="default-task">
                <DefaultTaskIcon />
              </span>
            ) : (
              <img
                className="user-file"
                alt="file"
                id="userfile"
                src={returnedFile && URL.createObjectURL(returnedFile as Blob)}
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
