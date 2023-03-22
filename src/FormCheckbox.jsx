export default function FormCheckbox({id, onChange, labelValue, checked}) {
    return (
        <div className="">
            <input className="checkmark" checked={checked} onChange={(e) => onChange(e.target.checked)} type="checkbox" id={id}></input>
            <label htmlFor={id}>{labelValue}</label>
        </div>
    );
}