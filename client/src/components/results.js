import React, { Component } from 'react';

class Results extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipeName: ''
    }
  }

  async componentDidMount() {
    let apiData = fetch(
      `http://localhost:3001/getData`
    )
    .then(response => {
      return response.json() //creates its own promise?!?!
    })
    .then(data => {
      console.log(data);
      this.setState({data: data})
    })
  }

  render () {
    return(
      <div>
       {this.state.keys || "waiting for data"}
      </div>
    )
  }
}
export default Results;
