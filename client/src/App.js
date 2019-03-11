import React, { Component } from 'react';
import Results from './components/results';
import logo from './logo.svg';

let blocked = JSON.parse(window.localStorage.getItem('blockedPosts')) || [];

let updateBlocked = (toBlock) => {
  blocked = JSON.parse(window.localStorage.getItem('blockedPosts'))
  // blocked.push(toBlock);
  // window.localStorage.setItem('blockedPosts', JSON.stringify(blocked));
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Results blocked={blocked} updateBlocked={updateBlocked}/>
      </div>
    );
  }
}

export default App;
