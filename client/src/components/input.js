import React from 'react'
import Autosuggest from 'react-autosuggest'

const Input = ({app}) => {
    // Everything from here

    // How Autosuggest makes suggestions
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase()
        return inputValue.length === 0 ?
            [] : 
            app.state.countries.filter(c => c.toLowerCase().includes(inputValue))
    }

    const renderSuggestion = suggestion => (
        <div>
          {suggestion}
        </div>
    )

    const onSuggestionsFetchRequested = ({value}) => {
        app.setState({suggestions: getSuggestions(value)})
    }

    const onSuggestionsClearRequested = () => {
        app.setState({suggestions: []})
    }

    const getSuggestionValue = suggestion => suggestion

    const handleChange = (event, { newValue }) => {
        app.setState({value: newValue})
    }

    const {value, suggestions} = app.state

    const inputProps = {
        placeholder: 'Type a country',
        value,
        onChange: handleChange
    }
    // To here are functions passed to Autosuggest plugin

    // Changes the state of the variable that describes the checkbox 
    const onCheck = async (event) => {
        await app.setState({capita: !app.state.capita})
    }

    // Returns the textfield, search button and checkbox
    return (
        <div>
        <div className="textBox">
            <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            />
            <button className="searchButton" onClick={app.onSearch}><i className="fas fa-search fa-3x"></i></button>
        </div>
        <label>
            <input type="checkbox" className="checkBox" onClick={onCheck}></input>
            <span className="capita">Per Capita</span>
        </label>
        </div>
    )
}

export default Input