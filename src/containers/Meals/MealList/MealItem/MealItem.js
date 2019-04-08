import React from 'react';
import classes from './MealItem.css';
export default function MealItem({ item, onClick }) {
  item = {
    name: 'Mapo Tofu',
    orderCount: 100,
    rating: 4,
    img:
      'https://www.seriouseats.com/images/2014/08/20140625-chengdu-mapo-2.jpg',
    id: 'asdadas'
  };
  const spiceRate = item.rating,
    spiceList = [];
  for (let i = 0; i < spiceRate; i++) {
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

      <p onClick={() => onClick(item.id)}>{item.name}</p>
    </div>
  );
}
