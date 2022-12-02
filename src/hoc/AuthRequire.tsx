import React from 'react';
import { useLocation, Navigate } from 'react-router';
import { useAppSelector } from '../redux/hooks';

type Props = { children: JSX.Element };

const AuthRequire: React.FC<Props> = ({ children }) => {
  const { isSignIn } = useAppSelector((state) => state.userSlice);

  if (!isSignIn) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default AuthRequire;
