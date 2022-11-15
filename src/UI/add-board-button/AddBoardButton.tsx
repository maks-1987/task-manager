import React from 'react';
import { localeEN } from '../../locales/localeEN';
import { useAppDispatch } from '../../redux/hooks';
import { setIsCreateBoard, setModalOpen } from '../../redux/modal-slice/modalSlice';
import './addBoardButton.css';

export default function AddBoardButton() {
  const dispatch = useAppDispatch();
  const addBoardButtonHandler = () => {
    dispatch(setModalOpen(true));
    dispatch(setIsCreateBoard(true));
  };
  return (
    <div className="add-board-button-container">
      <span className="add-board-button-label">
        {localeEN.boardsContet.ADD_NEW_BOARD_BUTTON_LABEL}
      </span>
      <button className="add-board-button" onClick={addBoardButtonHandler}>
        <svg
          className="add-board-button-cross"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          enableBackground="new 0 0 50 50"
        >
          <path d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z" />
          <path d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z" />
        </svg>
      </button>
    </div>
  );
}
