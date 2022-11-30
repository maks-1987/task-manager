import React, { useEffect } from 'react';
import BoardPreviewItem from '../../components/boards/board-preview-item/BoardPreviewItem';
import { localeEN } from '../../locales/localeEN';
import { fetchGetUserBoards } from '../../redux/boards-slice/boardsFechRequest';
import { setCurrentBoardId, setRemovedBoardId } from '../../redux/boards-slice/boardsSlice';
import { setResetCurrentBoardData } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AddBoardButton from '../../UI/add-board-button/AddBoardButton';
import Spinner from '../../UI/spinner/Spinner';
import './boardsPage.css';

export default function BoardsPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const userBoards = useAppSelector((state) => state.boardsSlice.userBoards);
  const isLoading = useAppSelector((state) => state.boardsSlice.isLoading);
  const fetchBoardErrorMessage = useAppSelector((state) => state.boardsSlice.errorMessage);
  useEffect(() => {
    dispatch(fetchGetUserBoards(token));
  }, [dispatch, token]);
  const { languageIndex } = useAppSelector((state) => state.settingsSlise);
  useEffect(() => {
    dispatch(setResetCurrentBoardData());
    dispatch(setCurrentBoardId(''));
    dispatch(setRemovedBoardId(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="boards-page">
      <div className="boards-page__container">
        <h1 className="boards-page__title">Boards Page</h1>
        <AddBoardButton />

        {isLoading && <Spinner />}
        {!isLoading && (
          <section className="boards-page__container_boards-field">
            {Boolean(fetchBoardErrorMessage) && (
              <h2 className="fetch-erroe-message">
                {localeEN.errors.FETCH_ERRORS_MESSAGE[languageIndex]}
              </h2>
            )}
            {!userBoards.length
              ? localeEN.boardsContet.HAVE_NOT_BOARD_MESSAGE
              : userBoards.map((board, index) => (
                  <BoardPreviewItem key={board.id} userBoard={board} index={index} />
                ))}
          </section>
        )}
      </div>
    </section>
  );
}
