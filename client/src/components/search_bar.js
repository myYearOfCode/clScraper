import React, { Component } from 'react';
import CityInput from './cityInput'


class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      updateMainState: props.updateMainState,
      clearMainState: props.clearMainState,
      citiesList: "",
      selectedCity: "boston,vermont,maine"
    }
    this.handleCityEntry = this.handleCityEntry.bind(this)
  }

  handleCityEntry = (event) => {
    // debugger
    // let citiesInputSplit = event.target.value.split(',')
    // console.log(citiesInputSplit)
    this.setState({selectedCity: event.target.value})
  }

  getNewSearch = (event) => {
    event.preventDefault()
    let query = encodeURI(document.getElementById("search_term_input").value)
    console.log(query)
    console.log(this.state.selectedCity.split(','))
    // split cities out into individual queries
    // fire off three queries in rapid fire
    // clear the state, then each one appends the state
    this.props.clearMainState()
    // let citiesList = ['boston','vermont','maine']
    let citiesList = this.state.selectedCity.split(',')

    citiesList.forEach(city => {
      fetch(
        `http://localhost:3001/api?search=${query}&cities=${city}`
      )
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(`${city}`)
        this.state.updateMainState(data)
      })
    })
  }

  render () {
    return(
    <div className= "headerBar">
      <form onSubmit={this.getNewSearch}>
        <div className="input-group">
          <CityInput
            handleCityEntry={this.handleCityEntry}
            selectedCity={this.state.selectedCity}
          />
          <label className="input-group-field">
            Search Terms
            <input
              className="input-group-field"
              id="search_term_input"
              type="text"
            />
          </label>
          <div className="input-group-button">
            <input
              type="submit"
              className="button"
              id="submit_search"
              value="Search"
            />
          </div>
        </div>
      </form>
    </div>
    )
  }
}
export default SearchBar;
