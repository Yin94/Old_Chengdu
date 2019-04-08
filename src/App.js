import React, { Component } from 'react';
import Auth from './containers/Auth/Auth';
import Meals from './containers/Meals/Meals';
import NavBar from './containers/NavBar/NavBar';
import MealDetail from './containers/MealDetail/MealDetail';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Cart from './components/CartStrip/Cart';

class App extends Component {
  state = {
    isStart: true
  };
  componentDidMount = () => {
    this.setState({ isStart: false });
  };

  render() {
    return (
      <div id='app'>
        {/* {this.state.isStart && <Redirect to='/auth/1' />} */}

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

export default App;
