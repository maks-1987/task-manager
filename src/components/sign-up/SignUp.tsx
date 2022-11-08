import * as React from 'react';

type Props = {
  switchForm: (isClick: boolean) => void;
};

export const SignUp = ({ switchForm }: Props) => {
  function handleSwitch(e: React.FormEvent) {
    e.preventDefault();
    switchForm(true);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <p className="">Регистрация</p>
      <div className="">
        <label htmlFor="username">Name</label>
        <input type="text" id="username" required />
      </div>
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
          Войти
        </a>
        <button type="submit" className="">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};
