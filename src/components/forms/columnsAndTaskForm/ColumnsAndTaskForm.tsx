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
import './columnsAndTasksForm.css';
import { localeEN } from '../../../locales/localeEN';

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
  const state = useAppSelector((store) => store.settingsSlise);

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
            required: localeEN.columnAndTaskMessages.MESSAGE_REQUIRED[state.languageIndex],
            minLength: {
              value: 2,
              message: localeEN.columnAndTaskMessages.MIN_LENGTH_WARN_TITLE[state.languageIndex],
            },
          })}
          type="text"
          placeholder={
            errors.title?.message
              ? errors.title?.message
              : localeEN.placeholderText.TITLE_TASK_DESCRIPTION[state.languageIndex]
          }
          className="create-board-form__title-input"
        />
        <textarea
          {...register('description', {
            required: localeEN.columnAndTaskMessages.MESSAGE_REQUIRED[state.languageIndex],
            minLength: {
              value: 5,
              message:
                localeEN.columnAndTaskMessages.MIN_LENGTH_WARN_DESCRIPTION[state.languageIndex],
            },
            disabled: !isCreateTask && !isEditTask,
          })}
          placeholder={localeEN.placeholderText.TASK_DESCRIPTION[state.languageIndex]}
          className="create-board-form__description-input"
        />
        <ButtonSuccess isValid={isValid} />
      </form>
    </>
  );
}
