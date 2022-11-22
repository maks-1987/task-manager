import React from 'react';
import { Outlet } from 'react-router-dom';
import { localeEN } from '../../locales/localeEN';
import { useAppSelector } from '../../redux/hooks';
import { GlobalModal } from '../../UI/global-modal/GlobalModal';
import Footer from '../footer/Footer';
import ColumnsAndTaskForm from '../forms/columnsAndTaskForm/ColumnsAndTaskForm';
import CreateBoardForm from '../forms/createBoardForm/CreateBoardForm';
import Header from '../header/Header';

export default function Layout() {
  const isModalOpen = useAppSelector((state) => state.modalSlice.isModalOpen);
  const isRemoveBoard = useAppSelector((state) => state.modalSlice.isRemoveBoard);
  const isCreateColumn = useAppSelector((state) => state.modalSlice.isCreateColumn);
  const isCreateTask = useAppSelector((state) => state.modalSlice.isCreateTask);

  const currentPropComponent = isRemoveBoard ? (
    localeEN.modalContetntMessage.REMOVE_BOARD_CONFIRM_MESSAGE
  ) : isCreateColumn || isCreateTask ? (
    <ColumnsAndTaskForm />
  ) : (
    <CreateBoardForm />
  );
  return (
    <>
      <Header />
      {isModalOpen && <GlobalModal component={currentPropComponent} />}
      <Outlet />
      <Footer />
    </>
  );
}
