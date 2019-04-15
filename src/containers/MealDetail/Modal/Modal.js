import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Modal.css';
let touchStartPos = 0;
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('touchstart', e => {
      const touches = [...e.touches];
      touchStartPos = touches[0].clientX;
    });
    window.addEventListener('touchend', this.swipedHandler);
  }
  swipedHandler = e => {
    const touches = [...e.changedTouches];

    const endPos = touches[0].clientX;
    const listLen = this.props.imgs.length;
    const posDiff = endPos - touchStartPos;
    if (posDiff > 5 && this.props.index > 0)
      this.props.selected(this.props.index - 1);
    else if (posDiff < -5 && this.props.index < listLen - 1)
      this.props.selected(this.props.index + 1);
  };

  render() {
    const gallery = this.props.imgs.map((ele, i) => (
      <img
        onClick={() => this.props.selected(i)}
        src={ele}
        alt={i}
        key={ele + i}
      />
    ));
    return (
      <div className={classes.container}>
        <div className={classes.main}>
          <NavLink onClick={this.props.closed} to='#'>
            &times;
          </NavLink>
          <img src={this.props.imgs[this.props.index]} alt='img' />
          <div className={classes.gallery}>{gallery}</div>
        </div>
      </div>
    );
  }
}
