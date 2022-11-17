import React from 'react';
import './buttons.css';
import { addTaskSVG } from './svgButtons';

export const ButtonNewTask = () => {
  return (
    <button className="button-new-task" title="add new task">
      {addTaskSVG()}
    </button>
  );
};
