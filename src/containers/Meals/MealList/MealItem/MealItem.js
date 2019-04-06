import React from 'react';
import classes from './MealItem.css';
export default function MealItem({ item, onClick }) {
  item = {
    name: 'Mapo Tofu',
    orderCount: 100,
    rating: 5,
    img:
      'https://www.seriouseats.com/images/2014/08/20140625-chengdu-mapo-2.jpg',
    id: 'asdadas'
  };
  return (
    <div className={classes.container}>
      <img src={item.img} alt='item.img' onClick={() => onClick(item.id)} />
      <strong>{item.rating}</strong>
      <strong>
        {item.orderCount} <small>orders monthly</small>{' '}
      </strong>
      <p onClick={() => onClick(item.id)}>{item.name}</p>
    </div>
  );
}
