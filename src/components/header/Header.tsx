import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export default function Header() {
  const login = useAppSelector((state) => state.userSlice.user.login);
  console.log(login);
  return (
    <div className="header">
      <NavLink to={`boards/:${login}`}>Boards</NavLink>
    </div>
  );
}
