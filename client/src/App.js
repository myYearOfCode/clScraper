import React, { Component } from 'react';
import Results from './components/results';


// import { BrowserRouter } from "react-router-dom"
import { Switch, Route } from 'react-router-dom'
let blocked = JSON.parse(window.localStorage.getItem('blockedPosts')) || [];

let updateBlocked = (toBlock) => {
  blocked = JSON.parse(window.localStorage.getItem('blockedPosts'))
}
//
// class App extends Component {
//   render() {
//     const extraProps = {blocked:blocked, updateBlocked:updateBlocked}
//     return (
//       <div className="App">
//       <Results blocked={blocked} updateBlocked={updateBlocked}/>
//       </div>
//     );
//   }
// }
//
// export default App;

class App extends Component {
  render() {
    const extraProps = {blocked:blocked, updateBlocked:updateBlocked}
    return (
      <div className="App">
      <Switch>
      debugger
        <Route path='/' render={() => (
          <Results blocked={blocked} updateBlocked={updateBlocked}/>
        )}/>
        <Route path='/test' render={() => (
          <Results props={test= "testing"}/>
        )}/>
      </Switch>
      </div>
    );
  }
}

export default App;
