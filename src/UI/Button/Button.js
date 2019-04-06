import React from 'react';
import classes from './Button.css';
export default function Button({ className = 'btn primary', ...others }) {
  const btnClass = className;

  return <button {...others} />;
}
