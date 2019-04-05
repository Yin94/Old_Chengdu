import React from 'react';
import classes from './MealList.css';
import MealList from './MealList/MealList';
export default function Meals() {
  return (
    <div className={classes.container}>
      <section className={classes.main}>
        <MealList />
      </section>
    </div>
  );
}
