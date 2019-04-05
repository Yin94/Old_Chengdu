import React, { Component } from 'react';
import Auth from './containers/Auth/Auth';
import Meals from './containers/Meals/Meals';
import NavBar from './containers/NavBar/NavBar';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';

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
          <Redirect to='menu' />
        </Switch>
      </div>
    );
  }
}

export default App;
