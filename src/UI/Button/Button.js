import React from 'react';
import classes from './Button.css';
export default function Button({ btn, curPage, ...others }) {
  if (btn) return <button {...others} />;
  if (curPage === parseInt(others.id))
    return <button className={classes.groupBtn} disabled {...others} />;
  else return <button className={classes.groupBtn} {...others} />;
}
