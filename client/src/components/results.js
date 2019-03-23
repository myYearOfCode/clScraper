import React, { Component } from 'react';
import queryString from "query-string"
// const Posting = require('./posting')
import SearchBar from './search_bar'
class Results extends Component {
  constructor(props){
    super(props);
    this.state = {
      blocked: this.props.blocked,
      updateBlocked: this.props.updateBlocked,
      data: {}
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

  componentWillMount() {
    let newObject = {}
    for (let i = 0; i < 13; i++) {
      newObject[i] = {blocked: [],
        dataIdString: "",
        dataPid: i,
        link: "",
        location: "",
        price: "",
        repostPid: i,
        title: "",
          }
    }
    console.log(newObject)
    this.setState({data: newObject})
  }

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
    fetch(
      `http://localhost:3001/getData`//`${query}`
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

  updateMainState = (data) => {
    this.setState({data: {}}) //clears the state data
    this.setState({data: data})
    console.log(this.state.data)
  }

  getImage = (dataId,size) => {
    // sizes: 50x50 300x300 600x450
    let url = ""
    if (dataId != undefined) {
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
    if (dataId != undefined) {
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


  makePosts = () => {
    let posted = []
    try {
      if (Object.keys(this.state.data).length > 0) {
        return Object.keys(this.state.data).map(key => {
          let post = this.state.data[key]
          let blockList = this.state.blocked
          if ((!blockList.includes(post.dataPid)) && (!blockList.includes(post.repostPid)) && (!posted.includes(post.dataPid)) && (!posted.includes(post.repostPid))) {
            posted.push(post.dataPid)
            posted.push(post.repostPid)
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
      <div className="outside5">
      <SearchBar updateMainState = {this.updateMainState}/>
        <div className="wrapper">
          {this.makePosts()}
        </div>
      </div>

    )
  }
}
export default Results;
