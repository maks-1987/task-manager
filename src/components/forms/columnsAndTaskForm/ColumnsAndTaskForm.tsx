import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchAddNewUserColumns } from '../../../redux/columns-slice/columnsFetchRequest';
import {
  fetchAddNewUserTasks,
  fetchChangeUserTask,
} from '../../../redux/columns-slice/tasksFetchRequest';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  setIsCreateBoard,
  setIsCreateColumn,
  setIsCreateTask,
  setIsEditTask,
  setIsRemoveBoard,
  setModalOpen,
} from '../../../redux/modal-slice/modalSlice';
import { IFetchQuery, IUserBoard, JwtDecode } from '../../../types/types';
import ButtonSuccess from '../../../UI/button-success/ButtonSuccess';

export default function ColumnsAndTaskForm() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const currentColumnId = useAppSelector((state) => state.columnsSlice.currentColumnId);
  const editedTaskId = useAppSelector((state) => state.columnsSlice.editedTaskId);
  const isCreateTask = useAppSelector((state) => state.modalSlice.isCreateTask);
  const isCreateColumn = useAppSelector((state) => state.modalSlice.isCreateColumn);
  const isEditTask = useAppSelector((state) => state.modalSlice.isEditTask);
  const editedTaskData = useAppSelector((state) => state.columnsSlice.editedTaskData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitSuccessful },
  } = useForm<IUserBoard>({
    mode: 'onBlur',
    defaultValues: {
      title: isEditTask ? editedTaskData.title : '',
      description: isEditTask ? editedTaskData.description : '',
    },
  });

  const columnOrTaskCreateHandler: SubmitHandler<IUserBoard> = (formData: IUserBoard) => {
    const currentUser: JwtDecode = jwtDecode(token);
    const dataForFetch: IFetchQuery = isCreateColumn
      ? {
          boardData: { ...formData },
          boardId: currentBoardId,
          token,
        }
      : isCreateTask
      ? {
          taskData: { ...formData, userId: currentUser.userId },
          boardId: currentBoardId,
          columnId: currentColumnId,
          token,
        }
      : {
          taskData: { ...formData, userId: currentUser.userId, order: editedTaskData.order },
          boardId: currentBoardId,
          columnId: currentColumnId,
          taskId: editedTaskId,
          token,
        };
    isCreateColumn && dispatch(fetchAddNewUserColumns(dataForFetch));
    isCreateTask && dispatch(fetchAddNewUserTasks(dataForFetch));
    isEditTask && dispatch(fetchChangeUserTask(dataForFetch));
    dispatch(setModalOpen(false));
    dispatch(setIsRemoveBoard(false));
    dispatch(setIsCreateColumn(false));
    dispatch(setIsCreateTask(false));
    dispatch(setIsCreateBoard(false));
    dispatch(setIsEditTask(false));
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
            disabled: !isCreateTask && !isEditTask,
          })}
          placeholder="ojfp'ja"
          className="create-board-form__description-input"
        />
        <ButtonSuccess isValid={isValid} />
      </form>
    </>
  );
}
