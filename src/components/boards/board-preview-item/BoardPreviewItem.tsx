import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { localeEN } from '../../../locales/localeEN';
import { fetchChangeUserBoard } from '../../../redux/boards-slice/boardsFechRequest';
import { setCurrentBoardId, setRemovedBoardId } from '../../../redux/boards-slice/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setIsRemoveBoard, setModalOpen } from '../../../redux/modal-slice/modalSlice';
import { IFetchQuery, IUserBoard } from '../../../types/types';
import CrossButton from '../../../UI/cross-button/CrossButton';
import './boardPreviewItem.css';

interface IProp {
  index: number;
  userBoard: IUserBoard;
}
export default function BoardPreviewItem(props: IProp) {
  const { userBoard, index } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [warnMessage, setWarnMessage] = useState<string>('');
  const user = useAppSelector((state) => state.userSlice.user.login);
  const token = useAppSelector((state) => state.userSlice.token);

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

  return (
    <article
      id={userBoard.id}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        isValid ? navigate(`/boards/${user}/${userBoard.id}`) : null;
        dispatch(setCurrentBoardId(e.currentTarget.id));
      }}
      className="boarder-preview-item"
    >
      <div className="boarder-previwe-item__container" id={userBoard.id}>
        <h4 className="boarder-previwe-item__item-number">#{index + 1}. </h4>
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
      </div>
      <div id={userBoard.id} className="boarder-previwe-item__todo-btn-block">
        <CrossButton id={userBoard.id} goToModalWindow={goToModalWindow} />
      </div>
    </article>
  );
}
