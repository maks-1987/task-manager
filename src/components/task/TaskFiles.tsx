import React from 'react';
import './taskFiles.css';
import { useAppSelector } from '../../redux/hooks';
import { TaskFilesRow } from './task-file-row/TaskFilesRow';

export const TaskFiles = () => {
  const { editedTaskData, editedTaskId } = useAppSelector((state) => state.columnsSlice);

  return (
    <article className="task-files-wrapper">
      <div className="task-files-item">
        <span className="file-name">name</span>
        <span className="file-size">size</span>
        <span className="file-img">file</span>
      </div>
      {editedTaskData.files &&
        editedTaskData.files.map((task, index) => (
          <TaskFilesRow
            key={editedTaskId + index}
            taskId={editedTaskId}
            fileName={task.filename}
            fileSize={task.fileSize}
          />
        ))}
    </article>
  );
};
