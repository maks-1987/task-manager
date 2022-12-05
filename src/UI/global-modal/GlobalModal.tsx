import React, { ReactElement } from 'react';
import { localeEN } from '../../locales/localeEN';
import ConfirmButton from '../modal-confirm-button/ConfirmButton';
import CloseModalButton from '../close-modal-button/CloseModalButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
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
import './globalModal.css';

type Props = { component: ReactElement | string };

export const GlobalModal = (props: Props) => {
  const { isModalOpen } = useAppSelector((state) => state.modalSlice);
  const isRemoveBoard = useAppSelector((state) => state.modalSlice.isRemoveBoard);
  const isRemoveColumn = useAppSelector((state) => state.modalSlice.isRemoveColumn);
  const isRemoveTask = useAppSelector((state) => state.modalSlice.isRemoveTask);
  const isCreateColumn = useAppSelector((state) => state.modalSlice.isCreateColumn);
  const isCreateTask = useAppSelector((state) => state.modalSlice.isCreateTask);
  const isCreateBoard = useAppSelector((state) => state.modalSlice.isCreateBoard);
  const isEditTask = useAppSelector((state) => state.modalSlice.isEditTask);
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  const currentModalTitle = isCreateBoard
    ? localeEN.modalContetntMessage.CREATE_NEW_BOARD_MESSAGE[languageIndex]
    : isCreateColumn
    ? localeEN.modalContetntMessage.CREATE_NEW_COLUMN_MESSAGE[languageIndex]
    : isCreateTask
    ? localeEN.modalContetntMessage.CREATE_NEW_TASK_MESSAGE[languageIndex]
    : isRemoveBoard
    ? localeEN.modalContetntMessage.REMOVE_BOARD_CONFIRM_MESSAGE[languageIndex]
    : isRemoveColumn
    ? localeEN.modalContetntMessage.REMOVE_COLUMN_CONFIRM_MESSAGE[languageIndex]
    : isRemoveTask
    ? localeEN.modalContetntMessage.REMOVE_TASK_CONFIRM_MESSAGE[languageIndex]
    : localeEN.modalContetntMessage.EDIT_TASK_MESSAGE[languageIndex];

  const state = useAppSelector((store) => store.settingsSlice);
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
    <div
      className={isModalOpen ? 'active modal ' + state.themeIndex : 'modal'}
      onClick={closeModalWindow}
    >
      <div
        className={isModalOpen ? 'active modal__content ' + state.themeIndex : 'modal__content'}
        onClick={(event): void => event.stopPropagation()}
      >
        <CloseModalButton />
        <h3 className={'modal-title ' + state.themeIndex}>{currentModalTitle}</h3>
        {isCreateBoard && props.component}
        {isCreateColumn && props.component}
        {isCreateTask && props.component}
        {isEditTask && props.component}
        {isRemoveBoard && <ConfirmButton />}
        {isRemoveColumn && <ConfirmButton />}
        {isRemoveTask && <ConfirmButton />}
      </div>
    </div>
  );
};
