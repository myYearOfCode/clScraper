import React, { Component } from 'react';
import Results from './components/results';

// let blocked = JSON.parse(window.localStorage.getItem('blockedPosts')) || [];
// let updateBlocked = (toBlock) => {
//   blocked = JSON.parse(window.localStorage.getItem('blockedPosts'))
// }
//
class App extends Component {
  render() {
    return (
      <div className="App">
            <Results />
      </div>
    );
  }
}

export default App;
