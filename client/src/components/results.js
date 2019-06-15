import React, { Component } from 'react';
import Listing from './listing'
import SearchBar from './search_bar'


class Results extends Component {
  constructor(props){
    super(props);
    this.state = {
      blocked: [],
      updateBlocked: this.props.updateBlocked,
      data: {},
  }
  this.clearMainState = this.clearMainState.bind(this)
}

  componentWillMount() {
    let newObject = {}
    for (let i = 0; i < 13; i++) {
      newObject[i] = {
        dataIdString: "",
        dataPid: i,
        link: "",
        location: "",
        price: "",
        repostPid: i,
        title: "",
        key: i
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

  clearMainState = () => {
    this.setState({data: {}})
    console.log(`data cleared`);
  }

  updateMainState = (data) => {
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
            // posted.push(post.repostPid)
            return <Listing post={post} />
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
          {`${Object.keys(this.state.data).length} total records found.`}
          {this.makePosts(this.state.data)}
        </div>
      </div>

    )
  }
}
export default Results;
