import * as React from 'react';
import { localeEN } from '../../locales/localeEN';
import '../register-page/registerPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { userSlice } from '../../redux/user-slice/userSlice';
import { useEffect } from 'react';
import { IUserForm } from '../../types/types';
import { Endpoints } from '../../endpoints/endpoints';

export const LoginPage = () => {
  const navigation = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm<IUserForm>({
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();
  const { error, user } = useAppSelector((state) => state.userSlice);
  const { errors } = formState;
  const onSubmitForm: SubmitHandler<IUserForm> = async (data) => {
    const response = await fetch(Endpoints.SIGN_IN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: data.login,
        password: data.password,
      }),
    });
    const loginData = await response.json();

    if (!response.ok) {
      dispatch(userSlice.actions.setError(loginData.message));
    } else {
      dispatch(userSlice.actions.setUserLogin(user.login));
      dispatch(userSlice.actions.setPassword(''));
      dispatch(userSlice.actions.setUserToken(loginData.token));

      navigation(`/boards/${user.login}`);
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ login: '', password: '' });
    }
  }, [formState.isSubmitSuccessful, reset]);

  useEffect(() => {
    dispatch(userSlice.actions.setError(''));
    dispatch(userSlice.actions.setPassword(''));
  }, [dispatch]);

  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onSubmitForm)}>
      <p className="sign-in-form__title">{localeEN.FORM_TITLE_LOGIN}</p>
      <div className="sign-in-form__item login">
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
          {errors.login?.type === 'minLength' && <span>*{localeEN.FORM_MESSAGE_MIN_LENGTH}</span>}
          {errors.login?.type === 'maxLength' && <span>*{localeEN.FORM_MESSAGE_MAX_LENGTH}</span>}
        </p>
      </div>
      <div className="sign-in-form__item password">
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
          {errors.password?.type === 'required' && <span>{errors.password?.message}</span>}
          {errors.password?.type === 'minLength' && (
            <span>*{localeEN.FORM_MESSAGE_MIN_LENGTH}</span>
          )}
        </p>
      </div>
      <div className="sign-in-form__item buttons">
        <Link to="/register" className="">
          {localeEN.FORM_LINK_REGISTRATION}
        </Link>
        <button type="submit" className="">
          {localeEN.FORM_BUTTON_LOGIN}
        </button>
      </div>
      <p className="form-failed">{error}</p>
    </form>
  );
};
