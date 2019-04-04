import React, { Component } from 'react';
import Auth from './containers/Auth/Auth';
import './App.css';

class App extends Component {
  render() {
    const authed = false;
    if (!authed) return <Auth />;
    return <div className='App' />;
  }
}

export default App;
