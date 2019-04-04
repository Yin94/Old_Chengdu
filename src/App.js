import React, { Component } from 'react';
import Auth from './containers/Auth/Auth';
import CourseList from './containers/CourseList/CourseList';
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
        {this.state.isStart && <Redirect to='/auth/1' />}
        <Switch>
          <Route path='/auth/:mode' component={Auth} />
          <Route path='/course-list' component={CourseList} />
        </Switch>
      </div>
    );
  }
}

export default App;
