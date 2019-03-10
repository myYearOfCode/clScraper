import React, { Component } from 'react';
// const Posting = require('./posting')

class Results extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }

  makePostDiv = (post) => {
    return (
      <div className = "outside" key={post.dataIdString}>
      <div className = "photoDiv">
      {this.getImage(post.dataIdString)}
      </div>
      <div className="text">
      <a href = {post.link}>
      <div className = {post.title} > {post.title} </div>
      </a>
      <div className = {post.price} > {post.price} </div>
      <div className = {post.location} > Location: {post.location} </div>
      <div className = "hideElement"> Hide </div>
      </div>
      </div>)
  }

  async componentDidMount() {
    let apiData = fetch(
      `http://localhost:3001/getData`
    )
    .then(response => {
      return response.json() //creates its own promise?!?!
    })
    .then(data => {
      this.setState({data: data})
      console.log(this.state.data);
      return (Object.keys(this.state.data)[0])
      if (Object.keys(this.state.data).length > 0) {
        return Object.keys(this.state.data).map(key => {
          let post = this.state.data[key]
          return this.makePostDiv(post)
        })
      }
      // this.setState({content: output})
    })
  }

  getImage = (dataId,size) => {
    // sizes: 50x50 300x300 600x450
    let images = (this.parseDataId(dataId));
    // return images.map((image) => {
    let url = `https://images.craigslist.org/${images[0]}_300x300.jpg`
    return (
      <img src = {url} />
    )
  }

  parseDataId = (dataId) => {
    let imageArray = dataId.split(",")
    imageArray = imageArray.map((imageId) => {
      return (imageId.split(":")[1])
    })
    return imageArray
  }


  makePosts = () => {
    // how can I get this to wait for the api call before it processes?
    // or at least refresh after the state is updated?
    if (Object.keys(this.state.data).length > 0) {
      return Object.keys(this.state.data).map(key => {
        let post = this.state.data[key]
        return this.makePostDiv(post)
      })
    }
  }

  render () {
    return (
      <div className="wrapper">
        {this.makePosts()}
      </div>
    )
  }
}
export default Results;
