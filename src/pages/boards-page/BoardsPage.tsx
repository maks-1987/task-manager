import React, { useEffect } from 'react';
import BoardPreviewItem from '../../components/boards/board-preview-item/BoardPreviewItem';
import { localeEN } from '../../locales/localeEN';
import { fetchGetUserBoards } from '../../redux/boards-slice/boardsFechRequest';
import { setCurrentBoardId, setRemovedBoardId } from '../../redux/boards-slice/boardsSlice';
import { setResetCurrentBoardData } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AddBoardButton from '../../UI/add-board-button/AddBoardButton';
import Spinner from '../../UI/spinner/Spinner';
import { languages } from '../../locales/languages';
import './boardsPage.css';

export default function BoardsPage() {
  const state = useAppSelector((store) => store.settingsSlice);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const userBoards = useAppSelector((state) => state.boardsSlice.userBoards);
  const isLoading = useAppSelector((state) => state.boardsSlice.isLoading);
  const fetchBoardErrorMessage = useAppSelector((state) => state.boardsSlice.errorMessage);

  useEffect(() => {
    dispatch(fetchGetUserBoards(token));
  }, [dispatch, token]);

  useEffect(() => {
    setTimeout(() => dispatch(setResetCurrentBoardData()), 500);
    dispatch(setCurrentBoardId(''));
    dispatch(setRemovedBoardId(''));
  }, []);

  return (
    <div className={'boards-page__container ' + state.themeIndex}>
      <div className="boards-page-items">
        <h3 className={'boards-page__title ' + state.themeIndex}>
          {languages.Boards[state.languageIndex]}
        </h3>
        <AddBoardButton />
      </div>

      <div className={'boards-container ' + state.themeIndex}>
        {isLoading && <Spinner />}
        {Boolean(fetchBoardErrorMessage) && (
          <h4 className="error-message">{languages.errorBoards[state.languageIndex]}</h4>
        )}
        {!userBoards.length
          ? localeEN.boardsContet.HAVE_NOT_BOARD_MESSAGE
          : userBoards.map((board, index) => (
              <BoardPreviewItem key={board.id} userBoard={board} index={index} />
            ))}
      </div>
    </div>
  );
}
