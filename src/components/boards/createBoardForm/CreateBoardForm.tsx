import React, { useEffect, useState } from 'react';
import './createBoardForm.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchAddNewUserBoard } from '../../../redux/boards-slice/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { IFetchQuery, IUserBoard } from '../../../types/types';
import { localeEN } from '../../../locales/localeEN';

export default function CreateBoardForm() {
  const [toolTip, setToolTip] = useState<string>('');
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
  const showToolTip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    !isValid ? setToolTip(localeEN.ADD_BOARD_TOOLTIP_MESSAGE) : null;
  };
  const hideToolTip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    !isValid && setToolTip('');
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
        <button
          disabled={!isValid}
          className="create-board-form__add-board-button"
          onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => showToolTip(e)}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => hideToolTip(e)}
        >
          <div className="create-board-form__add-board-button_tooltip">{toolTip}</div>
          <span className="add-board-button__yes">&#10004;</span>
        </button>
      </form>
    </>
  );
}
