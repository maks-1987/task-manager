import React, { useEffect } from 'react';
import BoardPreviewItem from '../../components/boards/board-preview-item/BoardPreviewItem';
import CreateBoardForm from '../../components/boards/createBoardForm/CreateBoardForm';
import Loader from '../../components/loader/Loader';
import { fetchGetUserBoards } from '../../redux/boards-slice/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './borderPage.css';

export default function BoardsPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const userBoards = useAppSelector((state) => state.boardsSlice.userBoards);
  const isLoading = useAppSelector((state) => state.boardsSlice.isLoading);

  useEffect(() => {
    dispatch(fetchGetUserBoards(token));
  }, [dispatch, token]);

  return (
    <section className="boards-page">
      <div className="boards-page__container">
        <h1 className="boards-page__title">Boards Page</h1>
        <CreateBoardForm />
        <section className="boards-page__container_boards-field">
          {isLoading && <Loader />}
          {!userBoards.length
            ? 'You have not any boards'
            : userBoards.map((board, index) => (
                <BoardPreviewItem key={board.id} userBoard={board} index={index} />
              ))}
        </section>
      </div>
    </section>
  );
}
