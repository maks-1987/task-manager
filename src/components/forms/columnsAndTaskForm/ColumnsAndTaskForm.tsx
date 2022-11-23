import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchAddNewUserColumns } from '../../../redux/columns-slice/columnsFetchRequest';
import { fetchAddNewUserTasks } from '../../../redux/columns-slice/tasksFetchRequest';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  setIsCreateBoard,
  setIsCreateColumn,
  setIsCreateTask,
  setIsRemoveBoard,
  setModalOpen,
} from '../../../redux/modal-slice/modalSlice';
import { IFetchQuery, IUserBoard, JwtDecode, IColumn } from '../../../types/types';
import ButtonSuccess from '../../../UI/button-success/ButtonSuccess';

export default function ColumnsAndTaskForm() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const currentColumnId = useAppSelector((state) => state.columnsSlice.currentColumnId);
  const isCreateTask = useAppSelector((state) => state.modalSlice.isCreateTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitSuccessful },
  } = useForm<IUserBoard>({ mode: 'onBlur' });

  const columnOrTaskCreateHandler: SubmitHandler<IUserBoard> = (formData: IUserBoard) => {
    const currentUser: JwtDecode = jwtDecode(token);
    const dataForFetch: IFetchQuery = !isCreateTask
      ? {
          boardData: { ...formData },
          boardId: currentBoardId,
          token,
          order: 1,
        }
      : {
          taskData: { ...formData, userId: currentUser.id },
          boardId: currentBoardId,
          columnId: currentColumnId,
          token,
        };
    !isCreateTask
      ? dispatch(fetchAddNewUserColumns(dataForFetch))
      : dispatch(fetchAddNewUserTasks(dataForFetch));
    dispatch(setModalOpen(false));
    dispatch(setIsRemoveBoard(false));
    dispatch(setIsCreateColumn(false));
    dispatch(setIsCreateTask(false));
    dispatch(setIsCreateBoard(false));
  };
  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);
  return (
    <>
      <form onSubmit={handleSubmit(columnOrTaskCreateHandler)} className="create-board-form">
        <input
          {...register('title', {
            required: 'This field is requaered',
            minLength: {
              value: 2,
              message: 'Should be min 2 character',
            },
          })}
          type="text"
          placeholder={errors.title?.message ? errors.title?.message : 'Title'}
          className="create-board-form__title-input"
        />
        <textarea
          {...register('description', {
            required: 'This field is requaered',
            minLength: {
              value: 5,
              message: 'Should be min 5 character',
            },
            disabled: !isCreateTask,
          })}
          placeholder="ojfp'ja"
          className="create-board-form__description-input"
        />
        <ButtonSuccess isValid={isValid} />
      </form>
    </>
  );
}
