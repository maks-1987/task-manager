import * as React from 'react';
import { localeEN } from '../../locales/localeEN';
import './loginPage.css';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { fetchLogin } from '../../redux/user-slice/userSlice';
import { useEffect } from 'react';

type FieldValues = {
  login: string;
  password: string;
};

export const LoginPage = () => {
  const { register, handleSubmit, reset, formState } = useForm<FieldValues>({
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();

  const onSubmitForm: SubmitHandler<FieldValues> = (data) => {
    dispatch(fetchLogin(data));
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ login: '', password: '' });
    }
  }, [formState.isSubmitSuccessful]);

  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onSubmitForm)}>
      <p className="sign-in-form__title">{localeEN.FORM_BUTTON_LOGIN}</p>
      <div className="sign-in-form__item login">
        <label htmlFor="login">Login</label>
        <input
          type="text"
          id="login"
          {...register('login', {
            required: true,
            maxLength: 20,
            minLength: 3,
          })}
        />
      </div>
      <div className="sign-in-form__item password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true, minLength: 3 })}
        />
      </div>
      <div className="sign-in-form__item buttons">
        <Link to="/register" className="">
          {localeEN.FORM_LINK_REGISTRATION}
        </Link>
        <button type="submit" className="">
          {localeEN.FORM_BUTTON_LOGIN}
        </button>
      </div>
    </form>
  );
};
