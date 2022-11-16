import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setIsCreateColumn, setModalOpen } from '../../redux/modal-slice/modalSlice';
import './buttons.css';

export const ButtonNewColumn = () => {
  const dispatch = useAppDispatch();
  const addColumnButtonHandler = () => {
    dispatch(setModalOpen(true));
    dispatch(setIsCreateColumn(true));
  };
  return (
    <button className="column-item__add-column" onClick={addColumnButtonHandler}>
      Add new column
    </button>
  );
};
