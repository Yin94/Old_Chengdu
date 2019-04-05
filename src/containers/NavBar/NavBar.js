import React, { Component, createRef } from 'react';
import classes from './NavBar.css';
import { NavLink } from 'react-router-dom';
export default class NavBar extends Component {
  barRef = createRef();
  state = {
    show: false
  };
  onCloseHandler = () => {
    this.barRef.current.style.width = '0';
  };
  onShowHandler = () => {
    this.barRef.current.style.width = '15%';
  };
  render() {
    return (
      <>
        <span className={classes.openBtn} onClick={this.onShowHandler}>
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
              </p>
            </NavLink>
            <NavLink to='/about-us'>
              <p>
                <span>></span>
                <span>About Us</span>
              </p>
            </NavLink>
            <NavLink to='/contact'>
              <p>
                {' '}
                <span>></span>
                <span>Contact</span>
              </p>
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}
