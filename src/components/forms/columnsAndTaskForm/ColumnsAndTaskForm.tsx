import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchAddNewUserColumns } from '../../../redux/columns-slice/columnsFetchRequest';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setIsRemoveBoard, setModalOpen } from '../../../redux/modal-slice/modalSlice';
import { IColumn, IFetchQuery } from '../../../types/types';
import ButtonSuccess from '../../../UI/button-success/ButtonSuccess';

export default function ColumnsAndTaskForm() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitSuccessful },
  } = useForm<IColumn>({ mode: 'onBlur' });

  const columnCreateHandler: SubmitHandler<IColumn> = (formData: IColumn) => {
    console.log(formData);
    const dataForFetch: IFetchQuery = {
      boardData: { ...formData },
      boardId: currentBoardId,
      token,
    };
    dispatch(fetchAddNewUserColumns(dataForFetch));
    dispatch(setModalOpen(false));
    dispatch(setIsRemoveBoard(false));
  };
  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);
  return (
    <>
      <form onSubmit={handleSubmit(columnCreateHandler)} className="create-board-form">
        <input
          {...register('title', {
            required: 'This field is requaered',
            minLength: {
              value: 2,
              message: 'Should be min 2 character',
            },
          })}
          type="text"
          placeholder={errors.title?.message ? errors.title?.message : 'Board title'}
          className="create-board-form__title-input"
        />
        {/* <input
          {...register('column', {
            required: 'This field is requaered',
            minLength: {
              value: 5,
              message: 'Should be min 5 character',
            },
          })}
          type="text"
          placeholder={
            // errors.description?.message ? errors.description?.message : 'Board description'
          }
          className="create-board-form__description-input"
        /> */}
        <ButtonSuccess isValid={isValid} />
      </form>
    </>
  );
}
