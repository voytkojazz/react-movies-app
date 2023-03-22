import DeleteButton from "./DeleteButton.jsx";


export default function ResultInfo({movie, onDelete}) {
    return (
        <>
        <div><span>Name: </span>{movie.originalTitle}</div>
        {movie.rating && (
            <div><span>Rating: </span>{movie.rating.averageRating}⭐</div>
        )}
        {movie.titleType && (
            <div><span>Type: </span> {movie.titleType}</div>
        )}
        {movie.startYear && (
            <div><span>Start Year: </span>{movie.startYear}</div>
        )}
        {movie.endYear && (
            <div><span>End Year: </span>{movie.endYear}</div>
        )}
        {movie.runtimeMinutes && (
            <div><span>Duration: </span>{movie.runtimeMinutes} min</div>
        )}
        {movie.rating && (
            <div><span>Number of Votes: </span>{movie.rating.numVotes}</div>
        )}
        {movie.genres && (
            <div><span>Genres: </span>{movie.genres}</div>
        )}
        <DeleteButton handleDelete={onDelete} id={movie.tconst}/>
        </>
    )
}