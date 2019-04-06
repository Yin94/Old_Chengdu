import React from 'react';
import MealItem from './MealItem/MealItem';
export default function MealList({ list, onClick }) {
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  list = list.map(ele => <MealItem key={ele} item={ele} {...{ onClick }} />);
  return <div id='mealList'>{list}</div>;
}
