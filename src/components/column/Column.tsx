import React, { useState } from 'react';
import { Task } from '../task/Task';
import './column.css';
import { ButtonDeleteColumn } from '../../UI/buttons/ButtonDeleteColumn';
import { ButtonNewTask } from '../../UI/buttons/ButtonNewTask';
import { ButtonNewColumn } from '../../UI/buttons/ButtonNewColumn';

export const Column = () => {
  const [columnTitle, setColumnTitle] = useState('Default name');

  const handleTitle = (event: React.FormEvent<HTMLInputElement>) => {
    setColumnTitle(event.currentTarget.value);
  };

  return (
    <>
      <div className="column-item">
        <div className="column-item__control">
          <input
            className="column-item__title"
            type="text"
            value={columnTitle}
            onChange={handleTitle}
          />
          <ButtonNewTask />
          <ButtonDeleteColumn />
        </div>
        <Task />
        <Task />
        <Task />
        <Task />
        <p className="column-item__add-task">
          <ButtonNewTask />
          Add new task
        </p>
      </div>
      <ButtonNewColumn />
    </>
  );
};
