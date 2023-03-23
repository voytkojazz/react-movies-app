import { InputNumber } from "antd";
import { useState } from "react"
import FormInput from "./FormInput";
import SelectFilmComponent from "./SelectFilmComponent"
import SelectNameComponent from "./SelectNameComponent";
import { apiUrl } from "./untils";


export default function AddPrincipalForm({notificationFunc}) {

    // form fields
    const [tconst, setTconst] = useState(null);
    const [nconst, setNconst] = useState(null);
    const [ordering, setOrdering] = useState(null);
    const [category, setCategory] = useState(null)
    const [character, setCharacter] = useState(null)
    const [job, setJob] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let params = {
            tconst: tconst,
            nconst: nconst,
            ordering: ordering,
            category: category,
            characters: character,
            job: job
        }

        try {
            let response = await fetch(apiUrl + "/principals/new", {
                method: "POST",
                body: JSON.stringify(params),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            let responseJson = await response.json();
            if (response.status == 201) {
                notificationFunc("success", responseJson.id);
                e.target.reset();
            }
            console.log(response);
            console.log(responseJson);

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="add-form">
            <InputNumber placeholder="Ordering" size="large" style={{marginBottom: 20}} onChange={(order) => setOrdering(order)} min={1} id={"ordering"}/>
            <FormInput onChange={setCategory} type="text" labelValue={"Category"}/>
            <FormInput onChange={setCharacter} type="text" labelValue={"Charachter (comma separated)"}/>
            <FormInput onChange={setJob} type="text" labelValue={"Job"}/>
            <SelectFilmComponent setTconst={setTconst}/>
            <SelectNameComponent setNconst={setNconst}/>
            <button type="submit" style={{marginTop: 20}} className="submit-button">Submit</button>
        </form>
    )
}