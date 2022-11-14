import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  fetchChangeUserBoard,
  fetchRemoveUserBoard,
  setRemovedBoardId,
} from '../../../redux/boards-slice/boardsSlice';
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
  const user = useAppSelector((state) => state.userSlice.user.login);
  const token = useAppSelector((state) => state.userSlice.token);

  const { register, handleSubmit } = useForm<IUserBoard>({
    mode: 'onChange',
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
    dispatch(fetchChangeUserBoard(newDataForFetch));
  };

  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsRemoveBoard(true));
    dispatch(setModalOpen(true));
    dispatch(setRemovedBoardId(e.currentTarget.id));
    e.stopPropagation();
  };

  return (
    <article
      onClick={() => {
        navigate(`/boards/${user}/board${index + 1}`);
      }}
      className="boarder-preview-item"
    >
      <div className="boarder-previwe-item__container" id={userBoard.id}>
        <h4 className="boarder-previwe-item__item-number">#{index + 1}. </h4>
        <form
          onBlur={handleSubmit(changeBoardData)}
          className="boarder-previwe-item__about-item"
          id={userBoard.id}
        >
          <input
            type="text"
            className="boarder-previwe-item__title"
            {...register('title', {
              required: 'This field should by fill',
              minLength: {
                value: 5,
                message: 'Should be min 5 character',
              },
            })}
            onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
          />
          <input
            type="text"
            className="boarder-previwe-item__description"
            {...register('description', {
              required: 'This field should by fill',
              minLength: {
                value: 5,
                message: 'Should be min 5 character',
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
