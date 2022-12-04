import React from 'react';
import { localeEN } from '../../locales/localeEN';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsCreateBoard, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { languages } from '../../locales/languages';
import './addBoardButton.css';

export default function AddBoardButton() {
  const state = useAppSelector((store) => store.settingsSlice);
  const dispatch = useAppDispatch();
  const addBoardButtonHandler = () => {
    dispatch(setModalOpen(true));
    dispatch(setIsCreateBoard(true));
  };
  return (
    <div
      className={'add-board-button-container ' + state.themeIndex}
      onClick={addBoardButtonHandler}
    >
      <div className={'add-board-button-label ' + state.themeIndex}>
        {languages.createBoard[state.languageIndex]}
      </div>
      <div>
        <svg className={'add-board-svg ' + state.themeIndex} viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm15 0h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
        </svg>
      </div>
    </div>
  );
}
