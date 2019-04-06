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
                src='data:image/png;base64,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'
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
                  backgroundColor: 'green',
                  width: '50%',
                  color: 'white',
                  fontSize: '1.3em'
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
