import React, { Component } from 'react';
import CityInput from './cityInput'


class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      updateMainState: props.updateMainState,
      clearMainState: props.clearMainState,
      nearbyCities: [],
      selectedCity: "",
      searchCities: []
    }
    this.handleCityEntry = this.handleCityEntry.bind(this)
    this.handleCitySelection = this.handleCitySelection.bind(this)
    this.makeCitiesForm = this.makeCitiesForm.bind(this)
  }

  handleCityEntry = (city) => {
    this.setState({selectedCity: city})
  }

  handleCitySelection = (city) => {
    fetch(`http://localhost:3001/nearby?city=${city}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText}) ,`
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      console.log(Object.keys(body))
      this.makeCitiesForm(body)
      this.setState({nearbyCities: Object.keys(body)})
    })
    .catch(error => console.error( `Error in fetch: ${error.message}` ));
  }

  makeCitiesForm = (cities) => {
    let citiesForm = [];
    Object.keys(cities).forEach( city => {
      citiesForm.push(
        <div className="cityDiv">
        <label htmlFor={city} key={`label${city}`}>
        </label>
        <input
          type="checkbox"
          name={cities[city]}
          value={cities[city]}
          id={cities[city]}
          key={`checkBox${city}`}
        />
      {cities[city]}
      </div>);
    })
    return citiesForm
  }

  getNewSearch = (event) => {
    event.preventDefault()
    let query = encodeURI(document.getElementById("search_term_input").value)
    console.log(query)
    // split cities out into individual queries
    // fire off three queries in rapid fire
    // clear the state, then each one appends the state
    this.props.clearMainState()
    this.setState({searchCities: [...this.state.nearbyCities,this.state.selectedCity] })

    this.state.searchCities.forEach(city => {
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
            handleCitySelection={this.handleCitySelection}
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
      <form>
      <div className="citiesCheckBoxes">
        {this.makeCitiesForm(this.state.nearbyCities)}
        </div>
      </form>
      {this.state.searchCities.join(', ')}
    </div>
    )
  }
}
export default SearchBar;
