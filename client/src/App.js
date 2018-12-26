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
      cumulativeCountry: []
    }
  }

  // Returns GET request as json
  async fetchJSON(url) {
    let ret = await fetch('api/v1/'+url)
    return await ret.json()
  }

  // Fetches the countries that have available data and the range of years
  async componentDidMount() {
    let result = await this.fetchJSON('countries')
    result = new Map(result)
    let years = await this.fetchJSON('years')
    let world = await this.fetchJSON('countries/wld')
    let cumulative = await this.fetchJSON('countries/cumulative')
    await this.setState({
      codeMap: result,
      countries: Array.from(result.keys()),
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
      const response = await this.fetchJSON(`countries/${code}`)
      const cumulativeCountry = await this.fetchJSON(`countries/cumulative/${code}`)
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