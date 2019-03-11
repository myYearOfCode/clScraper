import React, { Component } from 'react';
// const Posting = require('./posting')

class Results extends Component {
  constructor(props){
    super(props);
    this.state = {
      blocked: this.props.blocked,
      updateBlocked: this.props.updateBlocked,
      ata: [],

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
      <div className = "hideElement"> <a href="http://localhost:3000" className="hideLink" id={post.dataPid}>Hide</a></div>
      </div>
      </div>)
  }
/////
//figure out how to add event listener for all hide buttons that grabs the id of each hid button when it is clicked.
  componentDidUpdate() {
    let display = (event) => {
      event.preventDefault();
      console.log(event.srcElement.id)
      let clicked = document.getElementById(event.srcElement.id).closest('.outside')
      clicked.classList.add('hidden')
      let blockedPosts = JSON.parse(window.localStorage.getItem('blockedPosts'))  || [];
      blockedPosts.push(event.srcElement.id)
      window.localStorage.setItem('blockedPosts',JSON.stringify(blockedPosts));
      this.state.updateBlocked()
      return false
    }
    let x = document.getElementsByClassName("hideElement") || [];
    let y = [...x];
    y.forEach((each) => {each.addEventListener('click', display)})
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
    try {
      if (Object.keys(this.state.data).length > 0) {
        return Object.keys(this.state.data).map(key => {
          let post = this.state.data[key]
          if (!(this.state.blocked).find((each) => {
            console.log(`${each}, ${post.dataPid}, ${each === post.dataPid}`)
            if (each === post.dataPid || each === post.repostPid) {
              // this.updateBlocked(this.dataPid)
              // this.updateBlocked(this.repostPid)
              return true
            }
          })) {
            return this.makePostDiv(post)
          }
        })
      }
    }
      catch (error){
        console.log(`error in results ${error}`)
      }
  }

  render () {
    return (
      <div className="wrapper">
        {this.makePosts()}
      </div>
      // {this.makeEventHandlers()}
    )
  }
}
export default Results;
