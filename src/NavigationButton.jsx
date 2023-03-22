export default function NavigationButton({setPage, text, pageName}) {

    const handleClick = event => {
        setPage(pageName);
    }

    return (
        <button onClick={handleClick} className="navigation-button">{text}</button>
    );

}