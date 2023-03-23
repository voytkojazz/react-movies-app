import { Select } from "antd";
import { apiUrl } from "./untils";
import { useState } from "react";

let timeout;
let currentValue;

const fetchNames = (value, callback, setNotFound) => {
    if(timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    const fake = () => {
        let params = {
            name: value,
        }
        const getUrl = apiUrl + "/names/with-name?" + (new URLSearchParams(params)).toString();
        console.log("Request fired: " + getUrl)
        setNotFound("Searching...");
        fetch(getUrl).then((response) => response.json())
            .then(d => {
                if (currentValue === value) {
                    console.log(d)
                    if(d.length == 0) {
                        setNotFound(`No movies with '${value}' found.`)
                    }
                    callback(d.map(actor => ({
                        value: actor.nconst, 
                        text: actor.primaryName})))
                }}).catch((err) => {
                    console.log(err)
                });
        };
        timeout = setTimeout(fake, 800);
}


export default function SelectNameComponent ({setNconst}) {

    const [names, setNames] = useState([]);
    const [value, setValue] = useState();
    const [notFoundContent, setNotFoundContent] = useState("Type at least 3 letters to start searching...")

    const handleSearch = (newValue) => {
        if (newValue && newValue.length >= 3) {
            fetchNames(newValue, setNames, setNotFoundContent);
        } else {
            setNotFoundContent("Type at least 3 letters to start searching...");
            setNames([]);
        }
    };

    const handleChange = (newValue) => {
        setValue(newValue)
        setNconst(newValue)
    }

    return (
        <>
            <Select
                style={{
                    marginTop: 20
                }}
                size="large"
                notFoundContent={notFoundContent}
                placeholder={"Select a person"}
                showSearch
                value={value}
                showArrow={false}
                allowClear={true}
                optionFilterProp={"children"}
                onSearch={handleSearch}
                onChange={handleChange}
                filterOption={false}
                // filterOption={(input, option) => (option?.value?.toString().toLowerCase()?.indexOf(input.toLowerCase()) ?? 0) >= 0}
                options={(names || []).map(d => ({
                    value: d.value,
                    label: d.text,
                }))}
            />
        </>
    )
}