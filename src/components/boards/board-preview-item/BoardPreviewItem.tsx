import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { localeEN } from '../../../locales/localeEN';
import { fetchChangeUserBoard } from '../../../redux/boards-slice/boardsFechRequest';
import { setCurrentBoardId, setRemovedBoardId } from '../../../redux/boards-slice/boardsSlice';
import {
  fetchAddNewUserColumns,
  fetchGetAllUserColumns,
  fetchGetUserBoardByID,
  fetchGetUserBoardByIDForUserBoardList,
} from '../../../redux/columns-slice/columnsFetchRequest';
import { setResetCurrentBoardData } from '../../../redux/columns-slice/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setIsRemoveBoard, setModalOpen } from '../../../redux/modal-slice/modalSlice';
import { IFetchQuery, IUserBoard } from '../../../types/types';
import CrossButton from '../../../UI/cross-button/CrossButton';
import { languages } from '../../../locales/languages';
import TaskProgressBar from '../../task-progress-bar/TaskProgressBar';
import './boardPreviewItem.css';

interface IProp {
  index: number;
  userBoard: IUserBoard;
}
export default function BoardPreviewItem(props: IProp) {
  const { userBoard, index } = props;
  const state = useAppSelector((store) => store.settingsSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [warnMessage, setWarnMessage] = useState<string>('');
  const userCurrentBoardList = useAppSelector((state) => state.columnsSlice.userCurrentBoardList);
  const user = useAppSelector((state) => state.userSlice.user.login);
  const token = useAppSelector((state) => state.userSlice.token);
  const languageIndex = useAppSelector((state) => state.settingsSlice.languageIndex);
  const userDoneColumnListByBoardId = useAppSelector(
    (state) => state.columnsSlice.userDoneColumnListByBoardId
  );
  const isBoardPageOpen = useAppSelector((state) => state.columnsSlice.isBoardPageOpen);
  const userCurrentBoardListForTaskProgressBar = useAppSelector(
    (state) => state.columnsSlice.userCurrentBoardListForTaskProgressBar
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserBoard>({
    mode: 'all',
    defaultValues: {
      title: userBoard.title,
      description: userBoard.description,
    },
  });

  const changeBoardData: SubmitHandler<IUserBoard> = (newData: IUserBoard) => {
    const newDataForFetch: IFetchQuery = {
      boardData: { ...newData },
      boardId: userBoard.id,
      token,
    };
    setTimeout(() => dispatch(fetchChangeUserBoard(newDataForFetch)), 1000);
  };

  const onBlurValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    const errorsMessage = errors.title?.message || errors.description?.message;

    e.currentTarget.value.length < 5 || e.currentTarget.value.length > 1
      ? setWarnMessage(errorsMessage!)
      : setWarnMessage('');
  };

  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsRemoveBoard(true));
    dispatch(setModalOpen(true));
    dispatch(setRemovedBoardId(e.currentTarget.id));
    e.stopPropagation();
  };
  const goToCurrentUserBoardByID = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(setResetCurrentBoardData());
    const isDoneTitle = userDoneColumnListByBoardId
      .filter((item) => item.boardId === e.currentTarget.id)
      .at(-1)!.doneColumn;

    const dataForFetch: IFetchQuery = {
      boardId: userBoard.id!,
      token,
    };

    isDoneTitle.length > 0 || userCurrentBoardList.some((board) => board.id === e.currentTarget.id)
      ? null
      : dispatch(
          fetchAddNewUserColumns({
            boardData: { title: localeEN.columnContet.DEFAULT_DONE_COLUMN[languageIndex] },
            boardId: e.currentTarget.id,
            token,
          })
        );
    dispatch(setCurrentBoardId(e.currentTarget.id));
    isValid ? navigate(`/boards/${user}/${e.currentTarget.id}`) : null;
    dispatch(fetchGetUserBoardByID(dataForFetch));
  };

  useEffect(() => {
    const dataForFetch: IFetchQuery = {
      boardId: userBoard.id,
      token,
    };
    dispatch(fetchGetAllUserColumns(dataForFetch));
    setTimeout(() => dispatch(setResetCurrentBoardData()), 100);
  }, [dispatch]);
  useEffect(() => {
    const dataForFetch: IFetchQuery = {
      boardId: userBoard.id,
      token,
    };
    setTimeout(() => dispatch(fetchGetUserBoardByIDForUserBoardList(dataForFetch)), 200);
  }, [dispatch, token, userBoard.id]);

  return (
    <div
      id={userBoard.id!}
      onClick={(e: React.MouseEvent<HTMLElement>) => goToCurrentUserBoardByID(e)}
      className="board"
    >
      <div className={'board-number-container ' + state.themeIndex}>
        <h4 className={'board-number ' + state.themeIndex}>#{index + 1}.</h4>
        <div className={'board-number-svg ' + state.themeIndex}></div>
      </div>
      <div className="boarder-previwe-item__container" id={userBoard.id}>
        <form
          onKeyUp={handleSubmit(changeBoardData)}
          className="boarder-previwe-item__about-item"
          id={userBoard.id}
        >
          <span className="boarder-previwe-item__warning-message">
            {errors.title?.message && warnMessage}
          </span>
          <input
            type="text"
            placeholder={`${errors.title?.message && errors.title?.message}`}
            className="boarder-previwe-item__title"
            {...register('title', {
              onBlur: (e: React.FocusEvent<HTMLInputElement>) => onBlurValidation(e),
              required: localeEN.tooTipContent.CANNOT_BE_EMPTY_PLACEHOLDER_MESSAGE,
              minLength: {
                value: 5,
                message: localeEN.boardsContet.MIN_LENGTH_WARN_MESSAGE,
              },
            })}
            onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
          />
          <span className="boarder-previwe-item__warning-message">
            {errors.description?.message && warnMessage}
          </span>
          <input
            type="text"
            placeholder={`${errors.description?.message && errors.description?.message}`}
            className="boarder-previwe-item__description"
            {...register('description', {
              onBlur: (e: React.FocusEvent<HTMLInputElement>) => onBlurValidation(e),
              required: localeEN.tooTipContent.CANNOT_BE_EMPTY_PLACEHOLDER_MESSAGE,
              minLength: {
                value: 5,
                message: localeEN.boardsContet.MIN_LENGTH_WARN_MESSAGE,
              },
            })}
            onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
          />
        </form>
        <section className="board-previwe-item__task-propgress-bar ">
          {isBoardPageOpen &&
          userCurrentBoardList.length === 0 &&
          userCurrentBoardListForTaskProgressBar.length === 0 ? (
            <></>
          ) : (
            isBoardPageOpen &&
            userCurrentBoardList.length > 0 &&
            userCurrentBoardList.some((board) => board.id === userBoard.id) && (
              <TaskProgressBar boardId={userBoard.id!} />
            )
          )}
        </section>
      </div>
      <div id={userBoard.id} className="boarder-previwe-item__todo-btn-block">
        <CrossButton id={userBoard.id!} goToModalWindow={goToModalWindow} />
      </div>
    </div>
  );
}
