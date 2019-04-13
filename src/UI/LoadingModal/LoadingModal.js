import React from 'react';
import Spinner from '../Spinner/Spinner';
import classes from './LoadingModal.css';
export default function LoadingModal() {
  return (
    <div className={classes.loadingModal}>
      <Spinner />
    </div>
  );
}
