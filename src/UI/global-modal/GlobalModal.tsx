import React, { ReactElement } from 'react';
import './globalModal.css';
import { useAppSelector } from '../../redux/hooks';
import { localeEN } from '../../locales/localeEN';
import ConfirmButton from '../modal-confirm-button/ConfirmButton';
import CloseModalButton from '../close-modal-button/CloseModalButton';

type Props = { component: ReactElement | string };

export const GlobalModal = (props: Props) => {
  const { isModalOpen } = useAppSelector((state) => state.modalSlice);
  const isRemoveBoard = useAppSelector((state) => state.modalSlice.isRemoveBoard);

  return (
    <div className={isModalOpen ? 'modal active' : 'modal'}>
      <div
        className={isModalOpen ? 'modal__content active' : 'modal__content'}
        onClick={(event): void => event.stopPropagation()}
      >
        <CloseModalButton />
        <h3 className="modal-contene-message">
          {isRemoveBoard && typeof props.component === 'string'
            ? localeEN.modalContetntMessage.REMOVE_BOARD_CONFIRM_MESSAGE
            : localeEN.modalContetntMessage.CREATE_NEW_BOARD_MESSAGE}
        </h3>
        {!isRemoveBoard && props.component}
        {isRemoveBoard && <ConfirmButton />}
      </div>
    </div>
  );
};
