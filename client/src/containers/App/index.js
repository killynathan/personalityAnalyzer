import React, { Component } from 'react';
import icon from './icon.svg';
import loading from './loading.svg';
import './App.css';
import { getTwitterPersonality, getRedditPersonality } from './utils/apiCalls';
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
      currentUser: null,
      data: null,
      dataType: null //'twttiter' of 'reddit'
    };

    this.onComplete = this.onComplete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onComplete(_data, username) {
    if (_data.error) {
      this.setState({
        currentState: this.stateNames.ERROR,
        data: _data.error
      });
    }
    else {
      this.setState({
        currentState: this.stateNames.RECEIVED_DATA,
        data: _data,
        currentUser: username
      });
    }
  }

  onSubmit(username, datatype) {
    this.setState({
      currentState: this.stateNames.LOADING,
      datatype: datatype
    });
    if (datatype === 'twitter') {
      getTwitterPersonality(username, this.onComplete);
    }
    else {
      getRedditPersonality(username, this.onComplete);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-introContainer">
          <img src={icon} />
          <p className="App-title">Personality.ai</p>
          <p className="App-subTitle">
            Enter the social media profile (Twitter, Reddit) of a person you want to analyze, and we will give
            you a detailed personality summary. Powered by IBM Watson.
          </p>
          <UserInputForm
            name='Enter username of Twitter account you want to analyze:'
            placeholder='username'
            onSubmit={this.onSubmit}
          />
        </div>
        {this.state.currentState === this.stateNames.LOADING &&
          <img src={loading} alt="loading" />
        }
        {this.state.currentState === this.stateNames.RECEIVED_DATA &&
          <PersonalityPortrait
            personalityData={this.state.data}
            username={`${this.state.datatype === 'twitter' ? '@' : '/u/'}${this.state.currentUser}`}
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
