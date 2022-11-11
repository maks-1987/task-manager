import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchAddNewUserBoard } from '../../../redux/boards-slice/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { IFetchQuery, IUserBoard } from '../../../types/types';

export default function CreateBoardForm() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitSuccessful },
  } = useForm<IUserBoard>({ mode: 'onBlur' });

  const boardCreateHandler: SubmitHandler<IUserBoard> = (formData: IUserBoard) => {
    const dataForFetch: IFetchQuery = {
      boardData: { ...formData },
      token,
    };
    dispatch(fetchAddNewUserBoard(dataForFetch));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);
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
          {...register('description', {
            required: 'This field is requaered',
            minLength: {
              value: 5,
              message: 'Should be min 5 character',
            },
          })}
          type="text"
          placeholder={
            errors.description?.message ? errors.description?.message : 'Board description'
          }
          className="create-board-form__description-input"
        />
        <button disabled={!isValid} className="create-board-form__add-board-button">
          Add
        </button>
      </form>
    </>
  );
}
