import React from 'react';
import classes from './CartStrip.css';
import Button from '../../UI/Button/Button';
import CartList from './CartList/CartList';
export default function CartStrip() {
  return (
    <div className={classes.withBg}>
      <div className={classes.container}>
        <div>
          <div className={classes.list}>
            <CartList />
          </div>
          <div className={classes.desc}>
            <img
              src='http://www.happypandatx.com/wp-content/uploads/2017/12/happypanda_logo.png'
              alt=''
            />
            <Button>Order Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
