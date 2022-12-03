import React from 'react';
import './closeModalButton.css';
import { useAppDispatch } from '../../redux/hooks';
import {
  setIsCreateBoard,
  setIsCreateColumn,
  setIsCreateTask,
  setIsEditTask,
  setIsRemoveBoard,
  setIsRemoveColumn,
  setIsRemoveTask,
  setModalOpen,
} from '../../redux/modal-slice/modalSlice';

export default function CloseModalButton() {
  const dispatch = useAppDispatch();
  const closeModalWindow = () => {
    dispatch(setIsRemoveBoard(false));
    dispatch(setIsRemoveColumn(false));
    dispatch(setIsRemoveTask(false));
    dispatch(setIsCreateColumn(false));
    dispatch(setIsCreateTask(false));
    dispatch(setModalOpen(false));
    dispatch(setIsCreateBoard(false));
    dispatch(setIsEditTask(false));
  };
  return (
    <>
      <button onClick={closeModalWindow} className="close-modal-button">
        <svg
          className="close-modal-button__cross"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          enableBackground="new 0 0 50 50"
        >
          <path d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z" />
          <path d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z" />
        </svg>
      </button>
    </>
  );
}
