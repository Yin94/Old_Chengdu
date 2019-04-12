import React from 'react';
import classes from './MealItem.css';
import SpicePanel from '../../../../components/SpicePanel/SpicePanel';
export default function MealItem({ item, onClick }) {
  return (
    <div className={classes.container}>
      <img src={item.img} alt='item.img' onClick={() => onClick(item.id)} />
      <SpicePanel
        classInput={classes.spicePanel}
        spiceDegree={item.spiceDegree}
      />
      <div className={classes.namePanel}>
        <p onClick={() => onClick(item.id)}>{item.name}</p>
        <small onClick={() => onClick(item.id)}>{item.chineseName}</small>
      </div>
    </div>
  );
}
