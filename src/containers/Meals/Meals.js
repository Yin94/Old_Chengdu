import React, { Component } from 'react';
import classes from './MealList.css';
import MealList from './MealList/MealList';
export default class Meals extends Component {
  onSelectHandler = id => {
    this.props.history.push(`meal/${id}`);
  };
  render() {
    return (
      <div className={classes.container}>
        <section className={classes.main}>
          <img
            src='http://www.laochengnan.com/manage/Public/Edit/uploadfile/20170724/20170724180159510.png'
            alt=''
          />
          <img
            src='https://dejpknyizje2n.cloudfront.net/marketplace/products/cute-panda-icon-sticker-1539641331.8735018.png'
            alt=''
          />
          <img
            src='https://cdn3.iconfinder.com/data/icons/spa-flat-colorful/614/4600_-_Bamboo_Stick-512.png'
            alt=''
          />

          <MealList onClick={this.onSelectHandler} />
        </section>
      </div>
    );
  }
}
