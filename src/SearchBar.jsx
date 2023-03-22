import './SearchBar.css'
import axios from "axios"
import { apiUrl } from './untils';
import React from "react"



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
                    <button className='submit-button' type="submit">Search</button>
            </form>
        </div> 
    )
}

