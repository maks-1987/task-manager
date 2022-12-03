import React, { useEffect, useRef, useState } from 'react';
import { localeEN } from '../../locales/localeEN';
import { useAppSelector } from '../../redux/hooks';
import './taskProgressBar.css';

export default function TaskProgressBar() {
  const userCurrentBoard = useAppSelector((state) => state.columnsSlice.userCurrentBoard);
  const languageIndex = useAppSelector((state) => state.settingsSlice.languageIndex);
  const [uncompleteTasks, setUncompleteTasks] = useState<number>(0);
  const [doneTasks, setDoneTasks] = useState<number>(0);
  const [visible, setVisible] = useState<DocumentVisibilityState | undefined>('hidden');
  const [step, setStep] = useState<number>(0);
  const progressBar = useRef<HTMLDivElement>(null);
  const progressScale = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const doneTasks = userCurrentBoard.columns
      .filter(
        (column) =>
          column.title ===
          localeEN.columnContet.DEFAULT_DONE_COLUMN.filter((title) => title === column.title).at(-1)
      )
      .map((column) => column.tasks)
      .flat().length;

    const tasksAll = userCurrentBoard.columns
      .filter(
        (column) =>
          column.title !==
          localeEN.columnContet.DEFAULT_DONE_COLUMN.filter((title) => title === column.title).at(-1)
      )
      .map((column) => column.tasks)
      .flat().length;

    setUncompleteTasks(tasksAll + doneTasks);
    setDoneTasks(doneTasks);
  }, [languageIndex, userCurrentBoard.columns]);

  useEffect(() => {
    doneTasks === 0 && uncompleteTasks === 0 ? setVisible('hidden') : setVisible('visible');
    const progressBarWidth = parseInt(window.getComputedStyle(progressBar.current!).width);
    setStep(progressBarWidth / uncompleteTasks);
  }, [doneTasks, step, uncompleteTasks]);

  return (
    <div className="progress-block">
      <div className="done-task">
        <span className="done-task_text"> Done:{doneTasks} </span>
      </div>
      <div ref={progressBar} className="progress-bar">
        <div
          ref={progressScale}
          className="progress-scale"
          style={{
            width: `${step * doneTasks}px`,
            visibility: visible,
          }}
        ></div>
      </div>
      <div className="total-task">
        <span className="total-task_text"> Total:{uncompleteTasks} </span>
      </div>
    </div>
  );
}
