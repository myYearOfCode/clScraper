import React, { Component } from 'react';
// const Posting = require('./posting')

class Results extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipeName: '',
      data: []
    }
    // this.makePosts = this.makePosts.bind(this)
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

  makePosts = () => {
    let output = ""
    if (Object.keys(this.state.data) > 0) {
      (Object.keys(this.state.data)).forEach(post => {
        output += `
          <div class = "outside">
            <div class = "photoDiv">
              ${this.getImage(post.dataIdString)}
            </div>
            <div class="text">
              <a href = "${post.link}">
                <div class = "${post.title}" > ${post.title} </div>
              </a>
              <div class = "${post.price}" > ${post.price} </div>
              <div class = "${post.location}" > Location: ${post.location} </div>
              <div class = "hideElement"> Hide </div>
            </div>
          </div>`
      })
    }
    console.log(output)
    // this.setState({content: output})
    return output
  }

  render () {
    return (
          // <div className = "wrapper">
          <div>
            {this.makePosts()}
          </div>
          // </div>
          // <div>hi</div>
    )
  }
}
export default Results;
