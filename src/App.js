import React, { Component } from 'react';
import Auth from './containers/Auth/Auth';
import Meals from './containers/Meals/Meals';
import NavBar from './containers/NavBar/NavBar';
import MealDetail from './containers/MealDetail/MealDetail';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Cart from './containers/Cart/Cart';
import { SET_AUTH_DATA } from './store_redux/auth/auth';
import { connect } from 'react-redux';
class App extends Component {
  state = {
    isStart: true
  };
  componentDidMount = () => {
    this.setState({ isStart: false });
    const authed = localStorage.getItem('auth');

    if (authed) this.props.setAuth(JSON.parse(authed));
  };
  render() {
    return (
      <div id='app'>
        {!this.props.token && !localStorage.getItem('auth') ? (
          <>
            <Switch>
              <Route path='/auth/:mode' component={Auth} />
              <Redirect to='/auth/1' />
            </Switch>
          </>
        ) : (
          <>
            <NavBar />
            <Switch>
              <Route path='/menu' component={Meals} />
              <Route path='/meal/:id' component={MealDetail} />
              <Route path='/cart' component={Cart} />
              <Redirect to='/menu' />
            </Switch>
          </>
        )}
      </div>
    );
  }
}
const mps = state => ({
  token: state.auth.token
});
const mpd = dispatch => ({
  setAuth: data => {
    dispatch({ type: SET_AUTH_DATA, data });
  }
});
export default connect(
  mps,
  mpd
)(App);
