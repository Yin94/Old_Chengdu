import React from 'react';
import classes from './Modal.css';
export default function Modal({
  bg = 1,

  backgroundColor = 'rgba(245, 222, 179, 0.8)',
  children
}) {
  if (!bg) bg = require('../../assets/images/MealList/bg1.jpg');
  else if (bg === 1) bg = require('../../assets/images/MealList/bg1.jpg');

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className={classes.container}>
      <div style={{ backgroundColor }} className={classes.main}>
        {children}
      </div>
    </div>
  );
}
