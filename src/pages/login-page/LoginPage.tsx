import React, { useEffect } from 'react';
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IUserForm } from '../../types/types';
import { fetchLogin, userSlice } from '../../redux/user-slice/userSlice';
import { languages } from '../../locales/languages';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import ThemeSelector from '../../UI/selectors/ThemeSelector';
import '../register-page/registerPage.css';
=======
import { localeEN } from '../../locales/localeEN';
import '../register-page/registerPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchLogin, userSlice } from '../../redux/user-slice/userSlice';
import { IUserForm } from '../../types/types';
import { Endpoints } from '../../endpoints/endpoints';
>>>>>>> develop

export const LoginPage = () => {
  const navigation = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm<IUserForm>({
    mode: 'onChange',
  });
  const state = useAppSelector((store) => store.settingsSlise);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.userSlice);

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
      dispatch(userSlice.actions.setUserLogin(data.login));
      dispatch(userSlice.actions.setPassword(''));
      dispatch(userSlice.actions.setUserToken(loginData.token));

      navigation(`/boards/${data.login}`);
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
    <div className={'register-container ' + state.themeIndex}>
      <div className="selectors-container">
        <LanguageSelector />
        <ThemeSelector />
      </div>

      <div>
        <h3 className={'register-note ' + state.themeIndex}>
          {languages.notHaveReg[state.languageIndex]}
          <Link to="/register" className={'register-note-link ' + state.themeIndex}>
            {languages.register[state.languageIndex]}
            <span className={'register-note-link-arrow ' + state.themeIndex}>❯</span>
          </Link>
        </h3>
      </div>

      <form className="sign-in-form" onSubmit={handleSubmit(onSubmitForm)}>
        <p className={'sign-up-form__title ' + state.themeIndex}>
          {languages.authorization[state.languageIndex]}
        </p>
        <div className={'sign-up-form__item login ' + state.themeIndex}>
          <label htmlFor="login">{languages.login[state.languageIndex]}</label>
          <input
            className={'sign-in-form__input ' + state.themeIndex}
            type="text"
            id="login"
            {...register('login', {
              required: `${languages.requiredFieldNote[state.languageIndex]}`,
              maxLength: 20,
              minLength: 3,
            })}
          />
          <p className="form-messages">
            {errors.login?.type === 'required' && <span>{errors.login.message}</span>}
            {errors.login?.type === 'minLength' && (
              <span>{languages.formWarnMin[state.languageIndex]}</span>
            )}
            {errors.login?.type === 'maxLength' && (
              <span>{languages.formWarnMax[state.languageIndex]}</span>
            )}
          </p>
        </div>
        <div className={'sign-up-form__item password ' + state.themeIndex}>
          <label htmlFor="password">{languages.password[state.languageIndex]}</label>
          <input
            className={'sign-in-form__input ' + state.themeIndex}
            type="password"
            id="password"
            {...register('password', {
              required: `${languages.requiredFieldNote[state.languageIndex]}`,
              minLength: 3,
            })}
          />
          <p className="form-messages">
            {errors.password?.type === 'required' && <span>{errors.password?.message}</span>}
            {errors.password?.type === 'minLength' && (
              <span>{languages.formWarnMin[state.languageIndex]}</span>
            )}
          </p>
        </div>
        <div className="sign-in-form__item buttons">
          <button type="submit" className={'submit__button ' + state.themeIndex}>
            {languages.submit[state.languageIndex]}
          </button>
        </div>
        <p className="form-failed">{error}</p>
      </form>
    </div>
  );
};
