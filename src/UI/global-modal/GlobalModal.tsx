import React, { ReactElement } from 'react';
import './globalModal.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { modalSlice } from '../../redux/modal-slice/modalSlice';

type Props = { component: ReactElement };

export const GlobalModal = (props: Props) => {
  const { isModalOpen } = useAppSelector((state) => state.modalSlice);
  const dispatch = useAppDispatch();

  return (
    <div
      className={isModalOpen ? 'modal active' : 'modal'}
      onClick={() => dispatch(modalSlice.actions.setModalOpen(false))}
    >
      <div
        className={isModalOpen ? 'modal__content active' : 'modal__content'}
        onClick={(event): void => event.stopPropagation()}
      >
        <h3>Modal</h3>
        <button onClick={() => dispatch(modalSlice.actions.setModalOpen(false))}>
          close modal
        </button>
        {props.component}
      </div>
    </div>
  );
};
