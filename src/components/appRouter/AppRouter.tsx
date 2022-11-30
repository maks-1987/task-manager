import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardsPage from '../../pages/boards-page/BoardsPage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import WelcomePage from '../../pages/welcome-page/WelcomePage';
import Layout from './Layout';
import { RegisterPage } from '../../pages/register-page/RegisterPage';
import { LoginPage } from '../../pages/login-page/LoginPage';
import SingleBoard from '../../pages/single-board-page/SingleBoard';
import LogOut from '../../UI/log-out/LogOut';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="boards/:user" element={<BoardsPage />} />
        <Route path="boards/:user/:boardId" element={<SingleBoard />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<LogOut />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
