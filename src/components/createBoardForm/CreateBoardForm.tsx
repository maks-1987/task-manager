import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Endpoints } from '../../endpoints/endpoints';
import { tokeMok } from '../../pages/boards-page/BoardsPage';
import { IPreBoard } from '../../types/types';
interface IProp {
  setBoard: (data: IPreBoard) => void;
}
export default function CreateBoardForm(props: IProp) {
  const { setBoard } = props;
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IPreBoard>({ mode: 'onBlur' });
  console.log(errors);
  const boardCreateHandler: SubmitHandler<IPreBoard> = (boardData: IPreBoard) => {
    console.log(boardData);
    addBoard(boardData).then((data) => setBoard(data));
  };
  return (
    <>
      <form onSubmit={handleSubmit(boardCreateHandler)} className="create-board-form">
        <input
          {...register('title', {
            required: 'This field is requaered',
            minLength: {
              value: 5,
              message: 'Should be min 5 character',
            },
          })}
          type="text"
          placeholder={errors.title?.message ? errors.title?.message : 'Board title'}
          className="create-board-form__title-input"
        />
        <input
          {...register('description')}
          type="text"
          placeholder="Board description"
          className="create-board-form__description-input"
        />
        <button disabled={!isValid} className="create-board-form__add-board-button">
          Add
        </button>
      </form>
    </>
  );
}
export const addBoard = async (boardData: IPreBoard): Promise<IPreBoard> => {
  const response = await fetch(Endpoints.BOARDS, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${tokeMok}`,
    },
    body: JSON.stringify(boardData),
  });
  const data = response.json();
  return data;
};
