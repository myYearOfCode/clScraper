import React, { Component } from 'react';

class Listing extends Component {
  constructor(props){
    super(props);
    this.state = {
      post: props.post
    }
  }

  makePostDiv = (post) => {
    return (
      <div className = "outside" key={post.key}>
        <div className = "photoDiv">
          <a href = {post.link}>
            {this.getImage(post.dataIdString)}
          </a>
        </div>
        <div className="text">
          <a href = {post.link}>
            <div className = {post.title} > {post.title} </div>
          </a>
          <div className = {post.price} >
            {post.price}
          </div>
          <div className = {post.location} > Location: {post.location} </div>
          <div className = "hideElement">
            <a href="http://localhost:3000" className="hideLink" id={post.dataPid}>Hide</a>
          </div>
        </div>
      </div>)
  }

  getImage = (dataId,size) => {
    // sizes: 50x50 300x300 600x450
    let url = ""
    if (dataId !== undefined) {
      let images = (this.parseDataId(dataId));
      // return images.map((image) => {
       url = `https://images.craigslist.org/${images[0]}_300x300.jpg`
    } else {
     url = ""
    }
    return (
      <img src = {url} alt=""/>
    )
  }

  parseDataId = (dataId) => {
    if (dataId !== undefined) {
      try {
        let imageArray = dataId.split(",") || ""
        imageArray = imageArray.map((imageId) => {
          return (imageId.split(":")[1])
        })
        return imageArray
      }
      catch (error){
        console.error(`Error parsing dataId ${error}`)
      }
    }
  }
  render () {
    return(
      <div>{this.makePostDiv(this.props.post)}</div>
    )
  }
}
export default Listing;
