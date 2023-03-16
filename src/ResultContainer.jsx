import  React  from "react"
import ResultItem from "./ResultItem";


export default function ResultContainer({response, isLoading}) {

    const movies = response.data?._embedded.titleModelList.map( movie => 
        <ResultItem key={movie.tconst} movie={movie}/>
    );

    return (
        <div className="result-container">
            {isLoading && <div className="loading-item">Loading...</div>}
            {!isLoading && movies}
        </div>
    );
}