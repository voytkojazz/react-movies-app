import React from 'react'
import NavigationButton from './NavigationButton';
import AddMovieComponent from './AddMovieComponent';
import BackButton from './BackButton';
import Navigation from './Navigation';
import ResultContainer from './ResultContainer';
import SearchBar from './SearchBar'



export default function App() {
  
  const [searchResult, setSearchData] = React.useState({});
  const [isLoading, setLoading] = React.useState(false); 
  const [page, setPage] = React.useState("search");

  function handleDataReceived(newData) {
    console.log(newData)
    setSearchData(newData.data) // set searchResult to new response data when request is ready
    setLoading(false);
  }

  function handleLoading() {
    setLoading(true); // set isLoading to true when loading response data
  }

  return (
    <div className='container'>
      <Navigation>
        <NavigationButton text={"Add film"} setPage={setPage} pageName={"add-movie"}/>
        <NavigationButton text={"Test"} setPage={setPage} pageName={"search"}/>
      </Navigation>
      {page === "search" &&
        <>
        <SearchBar onDataReceived={handleDataReceived} onLoading={handleLoading}/>
        <ResultContainer response={searchResult} isLoading={isLoading}/> 
        </>
      }
      {
        page === "add-movie" && 
        <>
          <AddMovieComponent>
            <BackButton setPage={setPage}/>
          </AddMovieComponent>         
        </>
      }
    </div>
      
  );
}


