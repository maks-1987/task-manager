import React, { useEffect } from 'react';
import './createBoardForm.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { IFetchQuery, IUserBoard, JwtDecode } from '../../../types/types';
import ButtonSuccess from '../../../UI/button-success/ButtonSuccess';
import { setIsRemoveBoard, setModalOpen } from '../../../redux/modal-slice/modalSlice';
import { fetchAddNewUserBoard } from '../../../redux/boards-slice/boardsFechRequest';
import jwt_decode from 'jwt-decode';

export default function CreateBoardForm() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitSuccessful },
  } = useForm<IUserBoard>({ mode: 'onBlur' });
  const userToken: JwtDecode = jwt_decode(token);
  const boardCreateHandler: SubmitHandler<IUserBoard> = (formData: IUserBoard) => {
    const dataForFetch: IFetchQuery = {
      boardData: { ...formData },
      token,
      assignOwner: userToken.id,
    };

    dispatch(fetchAddNewUserBoard(dataForFetch));
    dispatch(setModalOpen(false));
    dispatch(setIsRemoveBoard(false));
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
        <ButtonSuccess isValid={isValid} />
      </form>
    </>
  );
}
