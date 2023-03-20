import  React, { useEffect, useState }  from "react"
import DeleteButton from "./DeleteButton";
import ResultItem from "./ResultItem";
import axios from "axios";
import { apiUrl } from "./untils";


export default function ResultContainer({response, isLoading}) {

    const [movies, setMovies] = useState([]);

    function handleDelete(id) {
        console.log(id)
        axios.delete(apiUrl + `/titles/delete/${id}`)
            .then(response => {
                console.log(response);
                setMovies(movies.filter(item => item.tconst != id));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if(response._embedded) {
            setMovies(response._embedded.titleModelList);
        }
    }, [response]);


    return (
        <div className="result-container">
            {isLoading && <div className="loading-item">Loading...</div>}
            {!isLoading && movies.map( movie => {
        return <ResultItem key={movie.tconst} movie={movie} onDelete={handleDelete}></ResultItem>
    }
    )}
        </div>
    );
}