import React from 'react'
import ResultContainer from './ResultContainer';
import SearchBar from './SearchBar'



export default function App() {
  
  const [searchResult, setSearchData] = React.useState({});
  const [isLoading, setLoading] = React.useState(false); 

  function handleDataReceived(newData) {
    console.log(newData)
    setSearchData(newData) // set searchResult to new response data when request is ready
    setLoading(false);
  }

  function handleLoading() {
    setLoading(true); // set isLoading to true when loading response data
  }

  return (
    <div className='container'>
      <SearchBar onDataReceived={handleDataReceived} onLoading={handleLoading}/>
      <ResultContainer response={searchResult} isLoading={isLoading}/>
    </div>
    
  );
}


