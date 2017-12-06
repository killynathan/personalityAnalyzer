import React, { Component } from 'react';
import icon from './icon.svg';
import loading from './loading.svg';
import './App.css';
import { getTwitterPersonality } from './utils/apiCalls';
import UserInputForm from '../../components/UserInputForm';
import PersonalityPortrait from '../../components/PersonalityPortrait/index.js';

class App extends Component {
  constructor(props) {
    super();
    this.stateNames = {
      NO_DATA: 0,
      LOADING: 1,
      RECEIVED_DATA: 2,
      ERROR: 3
    };
    this.state = {
      currentState: this.stateNames.NO_DATA,
      data: null
    };

    this.onComplete = this.onComplete.bind(this);
    this.onTwitterSubmit = this.onTwitterSubmit.bind(this);
  }

  onComplete(_data) {
    if (_data.error) {
      this.setState({
        currentState: this.stateNames.ERROR,
        data: _data.error
      });
    }
    else {
      this.setState({
        currentState: this.stateNames.RECEIVED_DATA,
        data: _data
      });
    }
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
        <div className="App-introContainer">
          <img src={icon} />
          <p className="App-title">Personality.ai</p>
          <p className="App-subTitle">Powered by IBM Watson</p>
          <UserInputForm
            name='Enter username of Twitter accout you want to analyze:'
            placeholder='Enter username of Twitter accout you want to analyze'
            onSubmit={this.onTwitterSubmit}
          />
        </div>
        {this.state.currentState === this.stateNames.LOADING &&
          <img src={loading} alt="loading" />
        }
        {this.state.currentState === this.stateNames.RECEIVED_DATA &&
          <PersonalityPortrait
            personalityData={this.state.data}
          />
        }
        {
          this.state.currentState === this.stateNames.ERROR &&
            <div>
              <p>{ this.state.data }</p>
            </div>
        }
      </div>
    );
  }
}

export default App;
