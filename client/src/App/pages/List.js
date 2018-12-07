import React, { Component } from 'react';

class List extends Component {
  // init the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // fetch the list on first mount
  componentDidMount(){
    this.getList();
  }

  // retrieves the list of items from the Express api
  getList = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {
    const { list } = this.state;

    return (
      <div className="App">
        <h1>
          List of Items
        </h1>
        {list.length ? (
          <div>
          {list.map((item) => {
            return(
              <div>
                {item}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h2>No List Items Found</h2>
        </div>
      )}
      </div>
    )
  }
}

export default List;
