import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import classes from './Auth.css';
import { NavLink, withRouter } from 'react-router-dom';
export default withRouter(
  class Auth extends Component {
    formRef = React.createRef();
    onSubmitHandler = e => {
      e.preventDefault();
    };
    render() {
      const signUpControls =
        this.props.match.params['mode'] === '0' ? (
          <>
            <div className={classes.controlGroup}>
              <input placeholder='Confirm password' type='text' />
            </div>
            <div className={classes.controlGroup}>
              <input placeholder='Student Id #' type='text' />
            </div>
          </>
        ) : null;

      return (
        <div className={classes.container}>
          <form onSubmit={this.onSubmitHandler} ref={this.formRef}>
            <ul>
              <NavLink
                activeStyle={{
                  color: 'black',
                  borderBottom: '2px solid #32bedc'
                }}
                to='/auth/1'>
                LOGIN IN
              </NavLink>
              <NavLink
                activeStyle={{
                  color: 'black',
                  borderBottom: '2px solid #32bedc'
                }}
                to='/auth/0'>
                SIGN UP
              </NavLink>
            </ul>
            <div className={classes.iconFrame}>
              <img
                src='https://image.flaticon.com/icons/png/512/17/17797.png'
                alt='icon'
                style={{
                  maxHeight: '100px',
                  maxWidth: '100px',
                  opacity: '0.8'
                }}
              />
            </div>
            <div className={classes.controlGroup}>
              <input placeholder='Email' type='email' autoFocus />
            </div>
            <div className={classes.controlGroup}>
              <input placeholder='Password' type='password' />
            </div>
            {signUpControls}
            <div className={classes.btnGroup}>
              <Button
                style={{
                  backgroundColor: '#46A9E9',
                  width: '50%',
                  color: 'white',
                  fontSize: '1.1em'
                }}
                onClick={() => this.props.history.push('/course-list')}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      );
    }
  }
);
