import React, { useEffect, useRef, useState } from 'react';
import { IComleteColumn, ITask } from '../../types/types';
import { ButtonDeleteTask } from '../../UI/task-buttons/ButtonDeleteTask';
import { ButtonDoneTask } from '../../UI/task-buttons/ButtonDoneTask';
import { ButtonEditTask } from '../../UI/task-buttons/ButtonEditTask';

import './task.css';
import { Draggable } from 'react-beautiful-dnd';
import { useAppSelector } from '../../redux/hooks';
import { Endpoints } from '../../endpoints/endpoints';
import { DefaultTaskIcon, UploadFileIcon } from '../../UI/column-buttons/svgButtons';

interface IProp {
  task: ITask;
  index: number;
  column: IComleteColumn;
}

export const Task = (props: IProp) => {
  const { token } = useAppSelector((state) => state.userSlice);
  const { id, order, title, description } = props.task;
  const [returnedFile, setReturnedFile] = useState<Blob>();
  const fileBtn = useRef<HTMLInputElement | null>(null);
  const { files } = props.task;

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await handleFetch(event.currentTarget.files![0]);
  };

  const handleLoadFile = () => {
    fileBtn.current?.click();
  };

  const handleFetch = async (files: File) => {
    const formData = new FormData();
    formData.append('taskId', id);
    formData.append('file', files as string | File);

    await fetch(`${Endpoints.FILE}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: 'multipart/form-data',
      },
      body: formData,
    });

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
    const lastFile = files?.length ? files?.length - 1 : 0;
    const responseFile = await fetch(
      `${Endpoints.FILE}/${props.task.id}/${files![lastFile].filename}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await responseFile.blob();
    setReturnedFile(data);
  };

  useEffect(() => {
    if (files?.length) getFile();
  }, [files?.length]);

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

            <button className="upload-file-task" onClick={handleLoadFile}>
              {<UploadFileIcon />}
            </button>
            <input
              type="file"
              onChange={handleFile}
              ref={fileBtn}
              className="vis-hidden"
              accept="image/*"
            />
            {!returnedFile ? (
              <span className="default-task-image">
                <DefaultTaskIcon />
              </span>
            ) : (
              <img
                className="user-file"
                alt={files![files?.length ? files?.length - 1 : 0].filename}
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
