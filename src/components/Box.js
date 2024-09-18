import React from 'react';
import './Box.css';

const Box = ({ letter, status }) => {
  const statusClass = status ? `box-${status}` : '';
  return <div className={`box ${statusClass}`}>{letter}</div>;
};

export default Box;
