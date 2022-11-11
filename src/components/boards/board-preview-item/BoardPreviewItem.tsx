import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  fetchChangeUserBoard,
  fetchRemoveUserBoard,
} from '../../../redux/boards-slice/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { IFetchQuery, IUserBoard } from '../../../types/types';
import './boardPreviewItem.css';

interface IProp {
  index: number;
  userBoard: IUserBoard;
}
export default function BoardPreviewItem(props: IProp) {
  const { userBoard, index } = props;
  const dispatch = useAppDispatch();
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
    console.log(newData);
    dispatch(fetchChangeUserBoard(newDataForFetch));
  };

  const removeBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const boardId = e.currentTarget.id;
    const dataForFetch: IFetchQuery = {
      boardId,
      token,
    };
    dispatch(fetchRemoveUserBoard(dataForFetch));
  };
  return (
    <article className="boarder-preview-item">
      <div className="boarder-previwe-item__container" id={userBoard.id}>
        <h4 className="boarder-previwe-item__item-number">#{index}. </h4>
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
          />
        </form>
      </div>
      <div id={userBoard.id} className="boarder-previwe-item__todo-btn-block">
        <button
          id={userBoard.id}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => removeBoard(e)}
          className="boarder-previwe-item__remove-button"
        >
          <span className="remove-button__cross">&times;</span>
        </button>
      </div>
    </article>
  );
}
