import React, { useEffect } from 'react';
import BoardPreviewItem from '../../components/boards/board-preview-item/BoardPreviewItem';
import CreateBoardForm from '../../components/boards/createBoardForm/CreateBoardForm';
import Loader from '../../components/loader/Loader';
import { localeEN } from '../../locales/localeEN';
import { fetchGetUserBoards } from '../../redux/boards-slice/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AddBoardButton from '../../UI/add-board-button/AddBoardButton';
import { GlobalModal } from '../../UI/global-modal/GlobalModal';
import './boardsPage.css';

export default function BoardsPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const userBoards = useAppSelector((state) => state.boardsSlice.userBoards);
  const isLoading = useAppSelector((state) => state.boardsSlice.isLoading);
  const isModalOpen = useAppSelector((state) => state.modalSlice.isModalOpen);
  const isRemoveBoard = useAppSelector((state) => state.modalSlice.isRemoveBoard);

  const currentPropComponent = isRemoveBoard ? (
    localeEN.modalContetntMessage.REMOVE_BOARD_CONFIRM_MESSAGE
  ) : (
    <CreateBoardForm />
  );
  useEffect(() => {
    dispatch(fetchGetUserBoards(token));
  }, [dispatch, token]);

  return (
    <section className="boards-page">
      <div className="boards-page__container">
        {isModalOpen && <GlobalModal component={currentPropComponent} />}
        <h1 className="boards-page__title">Boards Page</h1>
        <AddBoardButton />
        <section className="boards-page__container_boards-field">
          {isLoading && <Loader />}
          {!userBoards.length
            ? localeEN.boardsContet.HAVE_NOT_BOARD_MESSAGE
            : userBoards.map((board, index) => (
                <BoardPreviewItem key={board.id} userBoard={board} index={index} />
              ))}
        </section>
      </div>
    </section>
  );
}
