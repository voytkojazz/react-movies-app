import "./FormInput.css"


export default function FormInput ({type, id, onChange, labelValue}) {
    return (
        <div className="input-container">
            <input onChange={(e) => onChange(type === "text" ? e.target.value : e.target.valueAsNumber)} type="text" id={id}></input>
            <label htmlFor={id}>{labelValue}</label>
        </div>
    );
}