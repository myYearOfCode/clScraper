import React, { Component } from 'react';

class Results extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipeName: ''
    }
  }


  render () {
    let apiData = fetch(
      `http://localhost:3001/getData`
    )
    .then(response => {
      console.log(response.json())
      return JSON.stringify(response.json());
    })
    return(
      apiData
    )
  }
}
export default Results;
