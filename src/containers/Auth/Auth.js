import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import classes from './Auth.css';
import { NavLink, withRouter } from 'react-router-dom';
import { loginSchema, signupSchema } from './schemas/schemas';
import ErrorBlock from '../../UI/ErrorBlock/ErrorBlock';
import Joi from 'joi';
export default withRouter(
  class Auth extends Component {
    state = {
      formControls: {
        email: '',
        password: '',
        confirmPassword: '',
        userName: ''
      },
      errorBlocks: {
        email: '',
        password: '',
        confirmPassword: '',
        userName: ''
      }
    };
    onSubmitHandler = async e => {
      e.preventDefault();
      this.onRestErrHandler();
      const { email, password, ...others } = this.state.formControls;
      this.props.history.push('/meal-list');
      if (this.props.match.params['mode'] === '1') {
        try {
          const result = await Joi.validate({ email, password }, loginSchema);
          //TODO: submit logic
        } catch (error) {
          const eB = { ...this.state.errorBlocks };
          eB[error.origin] = error.message;
          this.setState({ errorBlocks: eB });
        }
      } else {
        try {
          const result = await Joi.validate(
            { email, password, ...others },
            signupSchema
          );
          //TODO: submit logic
        } catch (error) {
          const eB = { ...this.state.errorBlocks };
          if (error.origin) eB[error.origin] = error.message;
          else eB.confirmPassword = "Two passwords doesn't match.";
          this.setState({ errorBlocks: eB });
        }
      }
    };
    onInputChangeHandler = e => {
      const field = e.target.name;
      const formControls = { ...this.state.formControls };
      formControls[field] = e.target.value;
      this.setState({ formControls });
    };
    onRestErrHandler = e => {
      this.setState({ errorBlocks: {} });
    };
    render() {
      const signUpControls =
        this.props.match.params['mode'] === '0' ? (
          <>
            <div className={classes.controlGroup}>
              <input
                placeholder='Confirm password'
                type='password'
                name='confirmPassword'
                value={this.state.formControls.confirmPassword}
                onChange={this.onInputChangeHandler}
                required
              />
              {this.state.errorBlocks['confirmPassword'] && (
                <ErrorBlock>
                  {this.state.errorBlocks['confirmPassword']}
                </ErrorBlock>
              )}
            </div>
            <div className={classes.controlGroup}>
              <input
                placeholder='Username'
                type='text'
                name='userName'
                value={this.state.formControls.userName}
                onChange={this.onInputChangeHandler}
                required
              />
              {this.state.errorBlocks['userName'] && (
                <ErrorBlock>{this.state.errorBlocks['userName']}</ErrorBlock>
              )}
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
                  borderBottom: '3px solid #9d0315'
                }}
                onClick={this.onRestErrHandler}
                to='/auth/1'>
                LOGIN IN
              </NavLink>
              <NavLink
                activeStyle={{
                  color: 'black',
                  borderBottom: '3px solid #9d0315'
                }}
                onClick={this.onRestErrHandler}
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
                  opacity: '0.9'
                }}
              />
            </div>
            <div className={classes.controlGroup}>
              <input
                placeholder='Email'
                type='email'
                name='email'
                autoFocus
                required
                value={this.state.formControls.email.value}
                onChange={this.onInputChangeHandler}
              />
              {this.state.errorBlocks['email'] && (
                <ErrorBlock>{this.state.errorBlocks['email']}</ErrorBlock>
              )}
            </div>
            <div className={classes.controlGroup}>
              <input
                placeholder='Password'
                type='password'
                name='password'
                required
                value={this.state.formControls.password.value}
                onChange={this.onInputChangeHandler}
              />
              {this.state.errorBlocks['password'] && (
                <ErrorBlock>{this.state.errorBlocks['password']}</ErrorBlock>
              )}
            </div>
            {signUpControls}
            <div className={classes.btnGroup}>
              <Button
                style={{
                  backgroundColor: 'wheat',
                  width: '50%',
                  color: 'white',
                  fontSize: '1.1em'
                }}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      );
    }
  }
);
