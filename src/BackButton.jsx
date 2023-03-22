

export default function BackButton({setPage}) {

    const handleClick = event => {
        setPage("search");
    }

    return (
        <button onClick={handleClick} className="navigation-button back-button">Go Back</button>
    );

}