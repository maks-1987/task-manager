import React, { useState } from 'react';
import { Task } from '../task/Task';
import './column.css';
import { ButtonDeleteColumn } from '../../UI/column-buttons/ButtonDeleteColumn';
import { ButtonNewTask } from '../../UI/column-buttons/ButtonNewTask';
import { IComleteColumn, IFetchQuery } from '../../types/types';
import { localeEN } from '../../locales/localeEN';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchChangeUserColumn } from '../../redux/columns-slice/columnsFetchRequest';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface IProp {
  column: IComleteColumn;
  index: number;
}

export const Column = (props: IProp) => {
  const { id, title, order, tasks } = props.column;
  const [columnTitle, setColumnTitle] = useState(title);
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const token = useAppSelector((state) => state.userSlice.token);
  const handleTitle = (event: React.FormEvent<HTMLInputElement>) => {
    setColumnTitle(event.currentTarget.value);
  };

  const changeColumnTitleHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const dataForFetch: IFetchQuery = {
      columnData: { id, title: e.currentTarget.value, order },
      boardId: currentBoardId,
      columnId: id,
      token,
    };
    dispatch(fetchChangeUserColumn(dataForFetch));
  };

  const columnItem = {
    width: '300px',
    flex: '0 0 300px',
    overflow: 'auto',
    border: 'var(--border1)',
    backgroundColor: 'white',
    order: `${order}`,
  };
  return (
    <>
      <Draggable draggableId={id} index={props.index}>
        {(provided) => (
          <div
            // style={`${columnItem}, ${{ order: `${order}` }}`}
            // style={columnItem}
            className="column-item"
            id={id}
            // style={{ order: `${order}` }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p>{id}</p>
            <div className="column-item__control">
              <input
                className="column-item__title"
                type="text"
                value={columnTitle}
                onChange={handleTitle}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => changeColumnTitleHandler(e)}
              />
              <ButtonNewTask />
              <ButtonDeleteColumn id={id} />
            </div>
            {/*<Droppable droppableId="all-tasks" type="task">*/}
            {/*  {(provided) => (*/}
            <section className="task-list">
              {tasks?.length === 0 ? (
                <span className="column-item__message">
                  {localeEN.columnContet.HAVE_NOT_TASK_MESSAGE}
                </span>
              ) : (
                tasks?.map((task) => <Task key={task.id} />)
              )}
              {/*{provided.placeholder}*/}
            </section>
            {/*)}*/}
            {/*</Droppable>*/}

            <p className="column-item__add-task">
              <ButtonNewTask />
              Add new task
            </p>
          </div>
        )}
      </Draggable>
    </>
  );
};
