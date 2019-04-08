import React, { Component } from 'react';
// import queryString from "query-string"
import Listing from './listing'
import SearchBar from './search_bar'


class Results extends Component {
  constructor(props){
    super(props);
    this.state = {
      blocked: [],
      // updateBlocked: this.props.updateBlocked,
      data: {},
  }
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
    this.setState({data: newObject})
  }

  componentDidUpdate() {
    let display = (event) => {
      event.preventDefault();
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

  // async componentDidMount() {
  //   // let it load blankly. I'm ok with that.
  //   fetch(
  //     `http://localhost:3001/getData`//`${query}`
  //   )
  //   .then(response => {
  //     return response.json() //creates its own promise?!?!
  //   })
  //   .then(data => {
  //     this.setState({data: {}}) //clears the state data
  //     // this.setState({data: data})
  //     // this.clearMainState()
  //     this.updateMainState(data)
  //     // console.log(this.state.data)
  //   })
  // }

  clearMainState = () => {
    this.setState({data: {}})
    console.log(`data cleared`);
  }

  updateMainState = (data) => {
    // this.setState({data: {}}) //clears the state data
    // this.setState({data: data})
    this.setState({ data: Object.assign(this.state.data, data ) }) //appends new data
    console.log(this.state.data)
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
            return <Listing post={post} />
            // return this.makePostDiv(post)
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

        <SearchBar
        updateMainState = {this.updateMainState}
        clearMainState = {this.clearMainState}
        />
        <div className="wrapper">
          {this.makePosts()}
        </div>
      </div>

    )
  }
}
export default Results;
