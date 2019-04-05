import React from 'react';
import classes from './ErrorBlock.css';
export default function ErrorBlock({ children, style }) {
  return (
    <p {...{ style }} className={classes.error}>
      <span>Error: </span>
      {children}
    </p>
  );
}
