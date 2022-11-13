import React from 'react';
import { deleteColumnSVG } from './svgButtons';

export const ButtonDeleteColumn = () => {
  return <button className="button-delete-column">{deleteColumnSVG()}</button>;
};
