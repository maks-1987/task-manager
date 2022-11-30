import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setSignInStatus } from '../../redux/user-slice/userSlice';

function LogOut(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSignInStatus(false));
    navigate('/', { replace: false });
  });
  return <></>;
}

export default LogOut;
