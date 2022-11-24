import React from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import './projectBoard.css';

export const ProjectBoard = () => {
  return (
    <main className="project-board">
      <Link className="project-board__link" to="/">
        <span>↩</span>To welcome page
      </Link>
      <h2 className="project-board__title">Board title</h2>
      <article className="project-board__columns">
        {/*<Column />*/}
      </article>
    </main>
  );
};
