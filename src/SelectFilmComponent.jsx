import { useState } from "react";
import { Select } from "antd";
import { apiUrl } from "./untils.js"

let timeout;
let currentValue;

const fetchFilms = (value, callback, setNotFound) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;
    const fake = () => {
        let params = {
            title: value,
        }
        const getUrl = apiUrl + "/titles/with-title?" + (new URLSearchParams(params)).toString();
        console.log("Request fired: " + getUrl)
        setNotFound("Searching...");
        fetch(getUrl).then((response) => response.json())
            .then(d => {
                if (currentValue === value) {
                    console.log(d)
                    if(d.length == 0) {
                        setNotFound(`No movies with '${value}' found.`)
                    }
                    callback(d.map(film => ({
                        value: film.tconst, 
                        text: film.originalTitle + ` (${film.startYear});`, //+ film?.rating?.numVotes ? "" : ` ${film.rating.numVotes} Votes`//
                        votes: film?.rating?.numVotes})))
                }}).catch((err) => {
                    console.log(err)
                });
        };
        timeout = setTimeout(fake, 800);
};

export default function SelectFilmComponent({setTconst}) {

    const [films, setFilms] = useState([]);
    const [value, setValue] = useState();
    const [notFoundContent, setNotFoundContent] = useState("Type at least 3 letters to start searching...")

    const handleSearch = (newValue) => {
        if (newValue && newValue.length >= 3) {
            fetchFilms(newValue, setFilms, setNotFoundContent);
        } else {
            setNotFoundContent("Type at least 3 letters to start searching...");
            setFilms([]);
        }
    };

    const handleChange = (newValue) => {
        setValue(newValue);
        setTconst(newValue);
    }

    return(
        <>
        <Select 
            // style={{
            //     marginTop: 20
            // }}
            size="large"
            notFoundContent={notFoundContent}
            placeholder={"Select a film"}
            showSearch
            value={value}
            showArrow={false}
            allowClear={true}
            optionFilterProp={"children"}
            onSearch={handleSearch}
            onChange={handleChange}
            filterOption={false}
            options={(films || []).map(d => ({
                value: d.value,
                label: d.text,
                votes: d.votes
            }))}
            filterSort={(a, b) => a.votes < b.votes ? 1 : a.votes > b.votes ? -1 : 0}
        >
        </Select>
        </>
    );
}