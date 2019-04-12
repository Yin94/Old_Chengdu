import React from 'react';
import classes from './SpicePanel.css';
export default function SpicePanel({ spiceDegree }) {
  const spiceList = [];
  for (let i = 0; i < spiceDegree; i++) {
    spiceList.push(
      <div key={i}>
        <img
          src='https://cdn2.iconfinder.com/data/icons/food-vol-4-1/96/177-512.png'
          alt=''
        />
      </div>
    );
  }
  return <div className={classes.spicePanel}>{spiceList}</div>;
}
