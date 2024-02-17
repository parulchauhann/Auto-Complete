import React, { useEffect } from 'react'
import { useState } from 'react'
import data from '../../resources/countryData.json'
import './SearchBox.css'

function SearchBox() {
    const [suggestions, changeSuggestions] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const handleInput = (e) => {
        setSearchQuery(e.target.value)
        let filteredData = data.filter((element) => {
            return element.name.toLowerCase().includes(searchQuery.toLowerCase())
        })
        changeSuggestions(filteredData)
    }
    const clearData = () => {
        changeSuggestions([])
        setSearchQuery("")
    }
    const handleKeyDown = (e) => {
        if (e.keyCode == 27) {
            clearData()
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
    }, [])
    return (
        <div>
            <input type="text" placeholder='Enter text to search' onChange={handleInput} value={searchQuery} />
            {suggestions.length > 0 ? (
                <div id="suggestions">
                    <ul>{suggestions.map((element, index) => (
                        <li key={index}>{element.name}</li>
                    ))}</ul>
                </div>
            ) : (searchQuery != "" && (
                <div id='noResults'>No Results Found</div>
            ))}
        </div>
    )
}

export default SearchBox