import React, { Component } from 'react';
import logo from '../logo.svg';
import loading from '../loading.svg';
import '../App.css';
import { getTwitterPersonality } from '../utils/apiCalls';
import UserInputForm from '../components/UserInputForm';
import Personality from '../components/Personality';

class App extends Component {
  constructor(props) {
    super();
    this.stateNames = {
      NO_DATA: 0,
      LOADING: 1,
      RECEIVED_DATA: 2
    };
    this.state = {
      currentState: this.stateNames.NO_DATA,
      data: null
    };

    this.onComplete = this.onComplete.bind(this);
    this.onTwitterSubmit = this.onTwitterSubmit.bind(this);
  }

  onComplete(_data) {
    console.log(_data);
    this.setState({
      currentState: this.stateNames.RECEIVED_DATA,
      data: _data
    });
  }

  onTwitterSubmit(username) {
    this.setState({
      currentState: this.stateNames.LOADING
    });
    getTwitterPersonality(username, this.onComplete);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={loading} />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <UserInputForm
          name='Get Twitter Personality'
          onSubmit={this.onTwitterSubmit}
        />
        {this.state.currentState === this.stateNames.LOADING &&
          <img src={loading} alt="loading" />
        }
        {this.state.currentState === this.stateNames.RECEIVED_DATA &&
          <Personality
            personalityData={this.state.data}
          />
        }
      </div>
    );
  }
}

export default App;
