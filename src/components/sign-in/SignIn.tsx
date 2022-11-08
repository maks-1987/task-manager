import * as React from 'react';

type Props = {
  switchForm: (isClick: boolean) => void;
};

export const SignIn = ({ switchForm }: Props) => {
  function handleSwitch(e: React.FormEvent) {
    e.preventDefault();
    switchForm(false);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <p className="">Войти</p>
      <div className="">
        <label htmlFor="login">Login</label>
        <input type="text" id="login" required />
      </div>
      <div className="">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
      </div>
      <div className="">
        <a href="/" className="" onClick={handleSwitch}>
          Зарегистрироваться
        </a>
        <button type="submit" className="">
          Войти
        </button>
      </div>
    </form>
  );
};
