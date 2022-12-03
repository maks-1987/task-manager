import React from 'react';
import './taskFiles.css';
import { useAppSelector } from '../../redux/hooks';
import { TaskFilesRow } from './task-file-row/TaskFilesRow';

export const TaskFiles = () => {
  const { editedTaskData, editedTaskId } = useAppSelector((state) => state.columnsSlice);

  return (
    <>
      {editedTaskData.files![0] !== undefined ? (
        <article className="task-files-wrapper">
          <h3 className="task-files__title">Uploaded files</h3>
          <div className="task-files-item title">
            <span className="file-name">name</span>
            <span className="file-size">size</span>
            <span className="file-img">file</span>
          </div>
          <div className="task-files-content">
            {editedTaskData.files &&
              editedTaskData.files.map((task, index) => (
                <TaskFilesRow
                  key={editedTaskId + index}
                  taskId={editedTaskId}
                  fileName={task.filename}
                  fileSize={task.fileSize}
                />
              ))}
          </div>
        </article>
      ) : null}
    </>
  );
};
