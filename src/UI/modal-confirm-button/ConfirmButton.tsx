import React from 'react';
import { fetchRemoveUserBoard } from '../../redux/boards-slice/boardsFechRequest';
import { fetchRemoveUserColumn } from '../../redux/columns-slice/columnsFetchRequest';
import { setCurrentColumnId } from '../../redux/columns-slice/columnsSlice';
import { fetchRemoveUserTask } from '../../redux/columns-slice/tasksFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setIsCreateBoard,
  setIsCreateColumn,
  setIsCreateTask,
  setIsRemoveBoard,
  setIsRemoveColumn,
  setIsRemoveTask,
  setModalOpen,
} from '../../redux/modal-slice/modalSlice';
import { IFetchQuery } from '../../types/types';
import './confirmButton.css';

export default function ConfirmButton() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const removedBoardId = useAppSelector((state) => state.boardsSlice.removedBoardId);
  const removedColumnId = useAppSelector((state) => state.columnsSlice.removedColumnId);
  const removedTaskId = useAppSelector((state) => state.columnsSlice.removedTaskId);
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const currentColumnId = useAppSelector((state) => state.columnsSlice.currentColumnId);
  const isRemoveBoard = useAppSelector((state) => state.modalSlice.isRemoveBoard);
  const isRemoveColumn = useAppSelector((state) => state.modalSlice.isRemoveColumn);
  const isRemoveTask = useAppSelector((state) => state.modalSlice.isRemoveTask);

  const removeHandler = () => {
    const dataForFetch: IFetchQuery = isRemoveBoard
      ? {
          boardId: removedBoardId,
          token,
        }
      : isRemoveColumn
      ? {
          boardId: currentBoardId,
          columnId: removedColumnId,
          token,
        }
      : {
          boardId: currentBoardId,
          columnId: currentColumnId,
          taskId: removedTaskId,
          token,
        };

    isRemoveBoard && dispatch(fetchRemoveUserBoard(dataForFetch));
    isRemoveColumn && dispatch(fetchRemoveUserColumn(dataForFetch));
    isRemoveTask && dispatch(fetchRemoveUserTask(dataForFetch));
    dispatch(setModalOpen(false));
    dispatch(setIsRemoveBoard(false));
    dispatch(setIsRemoveColumn(false));
    dispatch(setIsRemoveTask(false));
    dispatch(setIsCreateColumn(false));
    dispatch(setIsCreateTask(false));
    dispatch(setIsCreateBoard(false));
    dispatch(setCurrentColumnId(''));
  };

  return (
    <>
      <button className="confirm-button" onClick={removeHandler}>
        <svg
          className="add-board-button__yes"
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="40px"
          height="40px"
        >
          <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z" />
        </svg>
      </button>
    </>
  );
}
