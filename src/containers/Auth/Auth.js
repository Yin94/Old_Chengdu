import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import classes from './Auth.css';
import { NavLink, withRouter } from 'react-router-dom';
import { loginSchema, signupSchema } from './schemas/schemas';
import { signUpWithEmail, signInWithEmail } from '../../db/auth';

import ErrorBlock from '../../UI/ErrorBlock/ErrorBlock';
import Joi from 'joi';
import { connect } from 'react-redux';
import { SET_AUTH_DATA, SET_LOADING } from '../../store_redux/auth/auth';
import LoadingModal from '../../UI/LoadingModal/LoadingModal';
import { Redirect } from 'react-router-dom';
const mps = state => ({
  token: state.auth.token,
  loading: state.auth.loading
});
const mpd = dispatch => ({
  setAuth: data => {
    dispatch({ type: SET_AUTH_DATA, data });
  },
  setLoading: loading => dispatch({ type: SET_LOADING, loading })
});
export default connect(
  mps,
  mpd
)(
  withRouter(
    class Auth extends Component {
      state = {
        formControls: {
          email: '',
          password: '',
          confirmPassword: '',
          userName: '',
          phone: ''
        },
        errorBlocks: {
          email: '',
          password: '',
          confirmPassword: '',
          userName: '',
          phone: ''
        }
      };
      onSubmitHandler = async e => {
        this.props.setLoading(1);
        e.preventDefault();
        this.onRestErrHandler();
        const { email, password, ...others } = this.state.formControls;
        if (this.props.match.params['mode'] === '1') {
          try {
            await Joi.validate({ email, password }, loginSchema);
            //TODO: submit logic
            const user = await signInWithEmail(email, password);
            if (user === 1) {
              const errorBlocks = { ...this.state.errorBlocks };
              errorBlocks['password'] = 'Wrong password for this email!';
              this.setState({ errorBlocks });
            } else if (user === 2) {
              const errorBlocks = { ...this.state.errorBlocks };
              errorBlocks['email'] = 'This email has not been signed up yet';
              this.setState({ errorBlocks });
            } else {
              //redux stuff;
              localStorage.setItem('auth', JSON.stringify(user));

              this.props.setAuth(user);
              this.props.history.push('/menu');
            }
            this.props.setLoading(0);
          } catch (error) {
            const eB = { ...this.state.errorBlocks };
            eB[error.origin] = error.message;
            this.setState({ errorBlocks: eB });
            this.props.setLoading(0);
          }
        } else {
          try {
            await Joi.validate({ email, password, ...others }, signupSchema);
            //TODO: submit logic
            const user = await signUpWithEmail({ email, password, ...others });
            if (parseInt(user) === user) {
              const errorBlocks = { ...this.state.errorBlocks };
              errorBlocks.email =
                'This email may already be used, try to used another one.';
              errorBlocks.userName =
                'This username may already be used, try to used another one.';
              this.setState({ errorBlocks });
              this.props.setLoading(0);
            } else {
              //redux
              localStorage.setItem('auth', JSON.stringify(user));
              this.props.setLoading(0);

              this.props.setAuth(user);
              this.props.history.push('/menu');
            }
          } catch (error) {
            const eB = { ...this.state.errorBlocks };
            if (error.origin) eB[error.origin] = error.message;
            else eB.confirmPassword = "Two passwords doesn't match.";
            this.setState({ errorBlocks: eB });
            this.props.setLoading(0);
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
              <div className={classes.controlGroup}>
                <input
                  placeholder='Phone#'
                  type='text'
                  name='phone'
                  value={this.state.formControls.password.value}
                  onChange={this.onInputChangeHandler}
                />
                {this.state.errorBlocks['phone'] && (
                  <ErrorBlock>{this.state.errorBlocks['phone']}</ErrorBlock>
                )}
              </div>
            </>
          ) : null;

        return (
          <>
            {this.props.token && <Redirect to='/menu' />}
            {this.props.loading && <LoadingModal />}

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
                    src={require('../../assets/images/Auth/panda.png')}
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
                    value={this.state.formControls.password.value}
                    onChange={this.onInputChangeHandler}
                  />
                  {this.state.errorBlocks['password'] && (
                    <ErrorBlock>
                      {this.state.errorBlocks['password']}
                    </ErrorBlock>
                  )}
                </div>

                {signUpControls}
                <div className={classes.btnGroup}>
                  <Button
                    btn
                    style={{
                      backgroundColor: 'green',
                      width: '50%',
                      color: 'white',
                      fontSize: '1.3em'
                    }}>
                    Submit
                  </Button>
                </div>
                <small>All rights reserved Lao Chengdu restaurant</small>
              </form>
            </div>
          </>
        );
      }
    }
  )
);
