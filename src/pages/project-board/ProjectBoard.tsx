import React from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/Column';

export const ProjectBoard = () => {
  return (
    <main>
      <Link to="/">To welcom page</Link>
      <h2>Board title</h2>
      <hr />
      <Column />
      <Column />
      <Column />
    </main>
  );
};
