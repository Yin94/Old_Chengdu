import React from 'react';
import classes from './MapMarker.css';
export default function MapMarker() {
  return (
    <>
      <div className={classes.pin} />
      <div className={classes.pulse} />
    </>
  );
}
