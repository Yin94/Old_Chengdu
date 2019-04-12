import React from 'react';
import classes from './MealItem.css';
export default function MealItem({ item, onClick }) {
  const spiceDegree = item.spiceDegree,
    spiceList = [];
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
  return (
    <div className={classes.container}>
      <img src={item.img} alt='item.img' onClick={() => onClick(item.id)} />
      <div className={classes.spicePanel}>{spiceList}</div>
      <div className={classes.namePanel}>
        <p onClick={() => onClick(item.id)}>{item.name}</p>
        <small onClick={() => onClick(item.id)}>{item.chineseName}</small>
      </div>
    </div>
  );
}
