import { useEffect, useState } from "react";
import "./FormInput.css"


export default function FormInput ({type, id, onChange, labelValue}) {

    const [inputvalue, setinputvalue] = useState(null)
    const [inputClassName, setinputClassName] = useState("")

    useEffect(() => {
        if(inputvalue !== "") {
            setinputClassName("is-valid")
        }
        onChange(inputvalue);
    }, [inputvalue])

    return (
        <div className="input-container">
            <input className={inputClassName} onChange={(e) => setinputvalue(type == "text" ? e.target.value : e.target.valueAsNumber)} type={type} id={id}></input>
            <label htmlFor={id}>{labelValue}</label>
        </div>
    );
}