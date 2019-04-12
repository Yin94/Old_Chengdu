import React from 'react';
import MealItem from './MealItem/MealItem';
export default function MealList({ list, onClick }) {
  list = list.map(ele => <MealItem key={ele.id} item={ele} {...{ onClick }} />);
  return <div id='mealList'>{list}</div>;
}
