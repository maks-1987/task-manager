import React from 'react';
import './task.css';
import { ITask } from '../../types/types';

type Props = unknown;

export const Task = (props: Props) => {
  return (
    <div className="task">
      <p>Task</p>
      <p>Description</p>
    </div>
  );
};
