import { useState } from "react";
import FormCheckbox from "./FormCheckbox";
import FormInput from "./FormInput";
import { apiUrl } from "./untils";
import "./AddMovieForm.css"


export default function AddMovieForm({setCreated, setCreatedId}) {

    // states for form inputs
    const [originalTitle, setOriginalTitle] = useState(null);
    const [primaryTitle, setPrimaryTitle] = useState(null);
    const [titleType, setTitleType] = useState(null);
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [isAdult, setIsAdult] = useState(false);
    const [runtimeMinutes, setRuntimeMinutes] = useState(null);
    const [genres, setGenres] = useState(null);

    // errors states
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(apiUrl + "/titles/new", {
                method: "POST",
                
                body: JSON.stringify({
                    originalTitle: originalTitle,
                    primaryTitle: primaryTitle,
                    titleType: titleType,
                    startYear: startYear,
                    endYear: endYear,
                    isAdult: isAdult,
                    runtimeMinutes: runtimeMinutes,
                    genres: genres
                }),
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            
            let responseJson = await response.json();
            
            setCreated(response.status === 201 ? true : false)
            setCreatedId(response.status === 201 ? responseJson.tconst : "")
            setErrors(response.status === 400 ? responseJson : null)

            console.log(response)
            console.log(responseJson)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
                {errors?.originalTitle && <div className="error-message">{errors.originalTitle}</div>}
                <FormInput type={"text"} onChange={setOriginalTitle} id={"original-title"} labelValue={"Original Title"}/>
                
                {errors?.primaryTitle && <div className="error-message">{errors.primaryTitle}</div>}
                <FormInput type={"text"} onChange={setPrimaryTitle} id={"primary-title"} labelValue={"Primary Title"}/>

                {errors?.titleType && <div className="error-message">{errors.titleType}</div>}
                <FormInput type={"text"} onChange={setTitleType} id={"title-type"} labelValue={"Title Type"}/>

                {errors?.startYear && <div className="error-message">{errors.startYear}</div>}
                <FormInput type={"number"} onChange={setStartYear} id={"start-year"} labelValue={"Start year"}/>
                
                {errors?.endYear && <div className="error-message">{errors.endYear}</div>}
                <FormInput type={"number"} onChange={setEndYear} id={"end-year"} labelValue={"End year"}/>

                <FormCheckbox onChange={setIsAdult} checked={isAdult} labelValue={"Adult"} id={"adult"}/>

                <FormInput type={"number"} onChange={setRuntimeMinutes} id={"runtime-minutes"} labelValue={"Runtime minutes"}/>

                {errors?.genres && <div className="error-message">{errors.genres}</div>}
                <FormInput type={"text"} onChange={setGenres} id={"genres"} labelValue={"Genres (separated by comma & without spaces)"}/>
                
                <button type="submit" className="submit-button form-button">Add</button>
                
            </form>
    );
}