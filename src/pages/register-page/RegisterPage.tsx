import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { localeEN } from '../../locales/localeEN';
import './registerPage.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { fetchRegistration } from '../../redux/user-slice/userSlice';
import { IUserForm } from '../../types/types';

export const RegisterPage = () => {
  const { register, handleSubmit, reset, formState } = useForm<IUserForm>({
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();
  const { errors } = formState;
  const onSubmitForm: SubmitHandler<IUserForm> = (data) => {
    dispatch(fetchRegistration(data));
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: '', login: '', password: '' });
    }
  }, [formState.isSubmitSuccessful]);

  return (
    <form className="sign-up-form" onSubmit={handleSubmit(onSubmitForm)}>
      <p className="sign-up-form__title">{localeEN.FORM_TITLE_REGISTRATION}</p>
      <div className="sign-up-form__item username">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: `*${localeEN.FORM_MESSAGE_REQUIRED}`,
            maxLength: 20,
            minLength: 3,
            pattern: /^[A-Za-z]+$/i,
          })}
        />
        <p className="form-messages">
          {errors.name?.type === 'required' && <span>{errors.name.message}</span>}
          {errors.name?.type === 'minLength' && (
            <span>
              *{localeEN.FORM_MESSAGE_LETTERS} & {localeEN.FORM_MESSAGE_MIN_LENGTH}
            </span>
          )}
          {errors.name?.type === 'maxLength' && <span>*{localeEN.FORM_MESSAGE_MAX_LENGTH}</span>}
        </p>
      </div>
      <div className="sign-up-form__item login">
        <label htmlFor="login">Login</label>
        <input
          type="text"
          id="login"
          {...register('login', {
            required: `*${localeEN.FORM_MESSAGE_REQUIRED}`,
            maxLength: 20,
            minLength: 3,
          })}
        />
        <p className="form-messages">
          {errors.login?.type === 'required' && <span>{errors.login.message}</span>}
          {errors.login?.type === 'minLength' && (
            <span>
              *{localeEN.FORM_MESSAGE_LETTERS} & {localeEN.FORM_MESSAGE_MIN_LENGTH}
            </span>
          )}
          {errors.login?.type === 'maxLength' && <span>*{localeEN.FORM_MESSAGE_MAX_LENGTH}</span>}
        </p>
      </div>
      <div className="sign-up-form__item password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: `*${localeEN.FORM_MESSAGE_REQUIRED}`,
            minLength: 3,
          })}
        />
        <p className="form-messages">
          {errors.password?.type === 'required' && <span>{errors.name?.message}</span>}
          {errors.password?.type === 'minLength' && (
            <span>
              *{localeEN.FORM_MESSAGE_LETTERS} & {localeEN.FORM_MESSAGE_MIN_LENGTH}
            </span>
          )}
        </p>
      </div>
      <div className="sign-up-form__item buttons">
        <Link to="/login" className="">
          {localeEN.FORM_LINK_LOGIN}
        </Link>
        <button type="submit" className="">
          {localeEN.FORM_BUTTON_REGISTRATION}
        </button>
      </div>
    </form>
  );
};
