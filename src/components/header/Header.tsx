import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export default function Header() {
  const { login, id } = useAppSelector((state) => state.userSlice);
  return (
    <div className="header">
      <NavLink to={`boards/${login}/${id}`}>Boards</NavLink>
    </div>
  );
}
