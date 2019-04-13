import React from 'react';
import classes from './Spinner.css';
export default function Spinner() {
  return <div className={classes['lds-spinner']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;

}
