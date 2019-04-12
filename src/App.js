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
        {this.state.isStart && !localStorage.getItem('auth') && (
          <Redirect to='/auth/1' />
        )}
        <NavBar />

        <Switch>
          <Route path='/menu' component={Meals} />
          <Route path='/auth/:mode' component={Auth} />
          <Route path='/auth/:mode' component={Auth} />
          <Route path='/meal/:id' component={MealDetail} />
          <Route path='/cart' component={Cart} />
          <Redirect to='menu' />
        </Switch>
      </div>
    );
  }
}
const mpd = dispatch => ({
  setAuth: data => {
    dispatch({ type: SET_AUTH_DATA, data });
  }
});
export default connect(
  null,
  mpd
)(App);
