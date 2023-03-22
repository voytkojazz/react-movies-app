import { useState } from "react";
import "./AddMovieComponent.css"
import AddMovieForm from "./AddMovieForm";
import {apiUrl} from "./untils.js";

export default function AddMovieComponent ({children}) {

    const [isCreated, setCreated] = useState(false);
    const [createdId, setCreatedId] = useState("");

    return (
        <section className="add-card">
            {!isCreated && <AddMovieForm setCreated={setCreated} setCreatedId={setCreatedId}/>}
            {isCreated && <p>The movie was created! It's id is {createdId}</p>}
            {children}
        </section>
    )
}