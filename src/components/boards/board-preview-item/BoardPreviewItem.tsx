import React from 'react';
import { fetchRemoveUserBoard } from '../../../redux/boards-slice/boardsSlice';
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
        <div className="boarder-previwe-item__about-item" id={userBoard.id}>
          <div className="boarder-previwe-item__title">{userBoard.title}</div>
          <div className="boarder-previwe-item__description">{userBoard.description}</div>
        </div>
      </div>
      <div id={userBoard.id} className="boarder-previwe-item__todo-btn-block">
        {/* <button
          id={userBoard.id}
          className="btn btn-success block-bts change"
          // onClick={() => setIsChange(true)}
        >
          Change
        </button> */}
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
