import React, { Component } from 'react';
//a callback function is passed in from app.js



class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    // find the form submit button
    let button = document.getElementById('submit_search')
    //define the callback function
    //this will be a promise
    let getNewSearch = (event) => {
      // parse the event data to get the form data and then use it
      let query = encodeURI(document.getElementsByClassName('input-group-field')[0].value)
      console.log(query)
      fetch(
        `http://localhost:3001/api?search=${query}&cities=boston%2Cvermont%2Cmaine`
      )
      .then(response => {
        return response.json() //creates its own promise?!?!
      })
      .then(data => {
        this.setState({data: {}}) //clears the state data
        this.setState({data: data})
        console.log(this.state.data)
      })
    }
    //bind the callback function to the element
    button.addEventListener('click', getNewSearch)
  }



  render () {
    return(
    <div className= "headerBar">
      <div class="input-group">
        <input class="input-group-field" type="text" />
        <div class="input-group-button">
          <input type="submit" class="button" id="submit_search" value="Search" />
        </div>
      </div>
    </div>
    )
  }
}
export default SearchBar;
