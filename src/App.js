import React, { Component, Suspense } from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { SET_AUTH_DATA } from './store_redux/auth/auth';
import { connect } from 'react-redux';
//
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Meals = React.lazy(() => import('./containers/Meals/Meals'));
const NavBar = React.lazy(() => import('./containers/NavBar/NavBar'));
const MealDetail = React.lazy(() =>
  import('./containers/MealDetail/MealDetail')
);
const Cart = React.lazy(() => import('./containers/Cart/Cart'));
const AboutUs = React.lazy(() => import('./components/AboutUs/AboutUs'));

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
        <Suspense fallback={<div>loading lazy component...</div>}>
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

                <Route path='/about-us' component={AboutUs} />
                <Redirect to='/menu' />
              </Switch>
            </>
          )}
        </Suspense>
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
