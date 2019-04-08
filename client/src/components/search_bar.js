import React, { Component } from 'react';
import CityInput from './cityInput'


class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      updateMainState: props.updateMainState,
      clearMainState: props.clearMainState
    }
  }

  async componentDidMount() {
    let button = document.getElementById('submit_search')
    let getNewSearch = (event) => {
      let query = encodeURI(document.getElementsByClassName('input-group-field')[0].value)
      console.log(query)
      //
      // //THIS SHOULD HAPPEN ON THE SERVER SIDE
      // //HOW DO I KNOW IF IT IS BLOCKING ON THE SERVER SIDE?
      //
      // // split cities out into individual queries
      // // fire off three queries in rapid fire
      // // clear the state, then each one appends the state
      // // the advantage is that we will see a response faster
      // this.props.clearMainState()
      // fetch(
      //   `http://localhost:3001/api?search=${query}&cities=boston`
      //   // `http://localhost:3001/api?search=${query}&cities=boston%2Cvermont%2Cmaine`
      // )
      // .then(response => {
      //   return response.json() //creates its own promise?!?!
      // })
      // .then(data => {
      //   console.log(data)
      //   this.state.updateMainState(data)
      // })
      // fetch(
      //   `http://localhost:3001/api?search=${query}&cities=vermont`
      // )
      // .then(response => {
      //   return response.json() //creates its own promise?!?!
      // })
      // .then(data => {
      //   console.log(data)
      //   this.state.updateMainState(data)
      // })
      // fetch(
      //   `http://localhost:3001/api?search=${query}&cities=maine`
      // )
      // .then(response => {
      //   return response.json() //creates its own promise?!?!
      // })
      // .then(data => {
      //   console.log(data)
      //   this.state.updateMainState(data)
      // })
    }
    //bind the callback function to the element
    // button.addEventListener('click', getNewSearch)
  }

  submitOnEnter = event => {
    console.log(event.key);
  }

  getNewSearch = (event) => {
    event.preventDefault()
    let query = encodeURI(document.getElementsByClassName('input-group-field')[0].value)
    console.log(query)

    //THIS SHOULD HAPPEN ON THE SERVER SIDE
    //HOW DO I KNOW IF IT IS BLOCKING ON THE SERVER SIDE?

    // split cities out into individual queries
    // fire off three queries in rapid fire
    // clear the state, then each one appends the state
    // the advantage is that we will see a response faster
    this.props.clearMainState()

    fetch(
      `http://localhost:3001/api?search=${query}&cities=boston`
      // `http://localhost:3001/api?search=${query}&cities=boston%2Cvermont%2Cmaine`
    )
    .then(response => {
      return response.json() //creates its own promise?!?!
    })
    .then(data => {
      console.log('boston')
      this.state.updateMainState(data)
    })

    fetch(
      `http://localhost:3001/api?search=${query}&cities=vermont`
    )
    .then(response => {
      return response.json() //creates its own promise?!?!
    })
    .then(data => {
      console.log('vermont')
      this.state.updateMainState(data)
    })

    fetch(
      `http://localhost:3001/api?search=${query}&cities=maine`
    )
    .then(response => {
      return response.json() //creates its own promise?!?!
    })
    .then(data => {
      console.log('maine')
      this.state.updateMainState(data)
    })
  }

  render () {
    return(
    <div className= "headerBar">
      <form onSubmit={this.getNewSearch}>
        <div className="input-group">
          <CityInput />
          <label className="input-group-field">
            Search Terms
            <input className="input-group-field" type="text" />
          </label>
          <div className="input-group-button">
            <input type="submit" className="button" id="submit_search" value="Search" />
          </div>
        </div>
      </form>
    </div>
    )
  }
}
export default SearchBar;
