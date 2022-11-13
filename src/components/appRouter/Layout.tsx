import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export default function Layout() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' ||
      location.pathname === '/login' ||
      location.pathname === '/register' ? null : (
        <Header />
      )}
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
