import  React, { useEffect, useState }  from "react"
import axios from "axios";
import { apiUrl } from "./untils";
import ResultCard from "./ResultCard";
import ResultInfo from "./ResultInfo";


export default function ResultContainer({response, isLoading}) {

    const [movies, setMovies] = useState([]);

    function handleDelete(id) {
        console.log(id)
        axios.delete(apiUrl + `/titles/delete/${id}`)
            .then(response => {
                console.log(response);
                setMovies(movies.filter(item => item.tconst != id)); // filter movies list and call setMovies to update the state
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if(response._embedded) {
            setMovies(response._embedded.titleModelList); // when response is ready, setting movies state to list of movies
        } else setMovies([])
    }, [response]);


    return (
        <div className="result-container">
            {isLoading && <div className="loading-item">Loading...</div>} 
            {!isLoading && movies.length === 0 && <div className="loading-item">Movies not found, try to enter a title and search</div>}
            {!isLoading && movies.map( movie =>  // if not a loading state - show the movies from responsem if loading, show loading-item
            <ResultCard key={movie.tconst}>
                <ResultInfo  onDelete={handleDelete} movie={movie}/>
            </ResultCard>
            )}
        </div>
    );
}