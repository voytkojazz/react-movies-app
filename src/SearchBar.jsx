import './SearchBar.css'
import axios from "axios"

import React from "react"

const apiUrl = "http://localhost:8080"

export default function SearchBar({ onDataReceived, onLoading }) {

    const [query, setQuery] = React.useState("");

    function onSubmit(event) {
        event.preventDefault();
        onLoading();
        axios.get(apiUrl + "/titles/filter", {
            params: {
                originalTitle: query,
                size: 15
            }
        }).then(response => {
            onDataReceived(response);
            
        }).catch(err => {
            console.log(err);
        });
    }
        
    function onChange(event) {
        setQuery(event.target.value)
    }

    return (
        <div className='search-bar-container'>
            <p>Search for movies</p>

            <form onSubmit={onSubmit}>
                    <input onChange={onChange} className='search-bar-input' type="text"></input>
                    <input className='search-button' type="submit"></input>
            </form>
        </div> 
    )
}

