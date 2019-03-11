import React, { Component } from 'react';
import Results from './components/results';
import logo from './logo.svg';

let blocked = ['6825381358','6819957875','6043518208']
// let blocked = JSON.parse(window.localStorage.getItem('blocked'));

let updateBlocked = (toBlock) => {
  blocked.push(toBlock);
  window.localStorage.setItem('blockedPosts', JSON.stringify(blocked));
}
// updateBlocked('6825381358')
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
