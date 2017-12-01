import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    let myParams = {
      method: 'POST',
      headers: new Headers({
        "Content-Type": 'application/x-www-form-urlencoded'
      }),
      body: "text=realDonaldTrump"
    };
    return fetch('http://localhost:8000/api/personality', myParams)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        return;
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
