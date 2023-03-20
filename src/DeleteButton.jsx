import "./DeleteButton.css"


export default function DeleteButton({handleDelete, id}) {
    return (
        <button className="delete-button" onClick={() => handleDelete(id)}>Delete</button>
    )
}