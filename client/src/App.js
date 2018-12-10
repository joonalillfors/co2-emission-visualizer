import React, { Component } from 'react'
import './App.css'
import Input from './components/input'
import Result from './components/result'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.onSearch = this.onSearch.bind(this)
    this.fetchJSON = this.fetchJSON.bind(this)
    this.state = {
      codeMap: new Map(),
      countries: [],
      value: '',
      suggestions: [],
      capita: false,
      data: [],
      world: [],
      cumulative: [],
      cumulativeCountry: [],
      yearValue: { min: 1960, max: 2017 },
      yearSlide: { min: 1961, max: 2016 }
    }
  }

  // Returns GET request as json
  async fetchJSON(url) {
    let ret = await fetch(url)
    return await ret.json()
  }

  // Fetches the countries that have available data and the range of years
  async componentDidMount() {
    let result = await this.fetchJSON('/api/countries')
    result = new Map(result)
    let years = await this.fetchJSON('/api/years')
    let world = await this.fetchJSON('/api/countries/wld')
    let cumulative = await this.fetchJSON('api/countries/cumulative')
    await this.setState({
      codeMap: result,
      countries: Array.from(result.keys()),
      yearValue: { min: years[0].Year, max: years[years.length-1].Year},
      yearSlide: { min: years[0].Year, max: years[years.length-1].Year},
      world,
      cumulative: cumulative.slice(0,10)
    })
  }

  /*
    Sends GET request to the server with corresponding country code,
    doesn't send the request if typed country isn't from the list of countries.
  */
  async onSearch() {
    const {value, countries} = this.state
    if (countries.includes(value)) {
      const code = this.state.codeMap.get(value)
      const response = await this.fetchJSON(`/api/countries/${code}`)
      const cumulativeCountry = await this.fetchJSON(`/api/countries/cumulative/${code}`)
      this.setState({data: response, cumulativeCountry})
    } else
      console.log("Must search with valid country.")
  }

  render() {
    return (
      <div className="App">
        <h1>CO²-EMISSIONS</h1>
        <Input app={this} />
        <Result app={this} />
      </div>
    )
  }
}

export default App