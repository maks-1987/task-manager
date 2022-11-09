import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { localeEN } from '../../locales/localeEN';
import './registerPage.css';
import { Endpoints } from '../../endpoints/endpoints';
import { SubmitHandler, useForm } from 'react-hook-form';

type FieldValues = {
  name: string;
  login: string;
  password: string;
};

export const RegisterPage = () => {
  const { register, handleSubmit, reset, formState } = useForm<FieldValues>({
    mode: 'onChange',
  });

  const onSubmitForm: SubmitHandler<FieldValues> = async (data) => {
    const response = await fetch(Endpoints.SIGN_UP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) console.log(response.status);
    const userData = await response.json();
    localStorage.setItem('userData', JSON.stringify(userData));
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
            required: true,
            maxLength: 20,
            minLength: 3,
            pattern: /^[A-Za-z]+$/i,
          })}
        />
      </div>
      <div className="sign-up-form__item login">
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
      <div className="sign-up-form__item password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true, minLength: 3 })}
        />
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
