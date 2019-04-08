import React, { Component } from 'react';
import classes from './MealDetail.css';
import Button from '../../UI/Button/Button';
export default class MealDetail extends Component {
  render() {
    const meal = {
      name: 'Mapo Tofu',
      price: 12,
      monthlyCount: 139,
      img: 'http://s9.sinaimg.cn/mw690/004j3VyDzy7knJkwl9S18&690',
      spiceDegree: 3,
      comments: ['great', 'yolo']
    };
    return (
      <div className={classes.container}>
        <div className={classes.modal}>
          <img
            src='https://i.pinimg.com/originals/c0/09/de/c009de8da90e99fd96c72eb4a8194a37.png'
            alt=''
          />
          <img
            className={classes.latern}
            src='https://images.vexels.com/media/users/3/158473/isolated/preview/6240a4222abfa5dc8290ef557f17bed8-chinese-lantern-flat-by-vexels.png'
            alt=''
          />
          <div className={classes.mainArea}>
            <div className={classes.mainPic}>
              <img src={meal.img} alt='' />
            </div>
            <div className={classes.detail}>
              <h2>{meal.name}</h2>
              <div className={classes.specs}>
                <p className={classes.spice}>spice rate:{meal.spiceDegree}</p>
                <p className={classes.count}>
                  monthly sales: {meal.monthlyCount}
                </p>
                <strong className={classes.price}>Price: {meal.price}$</strong>
                <Button
                  style={{
                    gridArea: 'btn',
                    display: 'block',
                    width: '80%',
                    border: '0',
                    padding: '5%',
                    margin: '0 auto',
                    color: 'white',
                    fontSize: '1.2em',
                    backgroundColor: 'green'
                  }}>
                  Add to Basket
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
