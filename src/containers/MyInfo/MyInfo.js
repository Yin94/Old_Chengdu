import React, { Component } from 'react';
import Modal from '../../hoc/Modal/Modal';
import classes from './MyInfo.css';

export default class MyInfo extends Component {
  render() {
    return (
      <Modal>
        <div className={classes.container}>
          <header>
            {' '}
            <h1>Welcome back {this.props.user}</h1>
          </header>

          <section className={classes.form}>
            <form onSubmit={this.onSubmitHandler}>
              <div className={classes.controlGroup}>
                <label htmlFor='username'>Username</label>
                <input name='username' type='text' />
              </div>
              <div className={classes.controlGroup}>
                <label htmlFor='phone#'>Phone:</label>
                <input name='phone#' type='text' />
              </div>
            </form>
          </section>
        </div>
      </Modal>
    );
  }
}
