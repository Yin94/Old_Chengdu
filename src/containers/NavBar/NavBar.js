import React, { Component, createRef } from 'react';
import classes from './NavBar.css';
import { NavLink } from 'react-router-dom';
export default class NavBar extends Component {
  barRef = createRef();

  onCloseHandler = () => {
    this.barRef.current.style.width = '0';
  };
  onShowHandler = () => {
    let width = '15%';
    if (window.innerWidth < 1000) width = '40%';
    this.barRef.current.style.width = width;
  };
  render() {
    return (
      <>
        <span
          className={classes.openBtn}
          style={{ zIndex: '3' }}
          onClick={this.onShowHandler}>
          &#9776;
        </span>
        <div className={classes.container} ref={this.barRef}>
          <NavLink onClick={this.onCloseHandler} to='#'>
            &times;
          </NavLink>
          <div className={classes.main}>
            <NavLink to='/menu'>
              <p>
                <span>></span> <span> Menu</span>
                <img
                  src='https://static1.squarespace.com/static/5482422be4b0d888e3a1ef5f/t/5ae17ddf1ae6cf941a6ac474/1524727269975/1.png'
                  alt='menu'
                />
              </p>
            </NavLink>
            <NavLink to='/cart'>
              <p>
                <span>></span> <span> Basket</span>
                <img
                  src='https://www.freeiconspng.com/uploads/grocery-basket-icon-8.png'
                  alt='basket'
                />
              </p>
            </NavLink>
            <NavLink to='/about-us'>
              <p>
                <span>></span>
                <span>About Us</span>
                <img
                  src='http://pngimg.com/uploads/panda/panda_PNG17.png'
                  alt='basket'
                />
              </p>
            </NavLink>
            <NavLink to='/contact'>
              <p>
                {' '}
                <span>></span>
                <span>Contact</span>
                <img
                  src='http://www.stickpng.com/assets/images/5a4525cd546ddca7e1fcbc84.png'
                  alt='contact'
                />
              </p>
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}
