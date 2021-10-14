import { useState } from "react";
import AddRmCat from "./AddRmCat";

const Categories = ({appState2, backEnd}) => {
    const [showAddRmCat, setShowAddRmCat] = useState(false);
    const [newCat, setNewCat] = useState();
    const catClick = () => {
        console.log('cat clicked');
    }
    const addCat = async (e) => {
        e.preventDefault();
        const body = `{ "username" : "${appState2.username}", "newCategory" : "${newCat}" }`;
       await fetch(`${backEnd}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((res) => {
            return res.json();
        }).then((res2) => {
            alert(`${res2.results}`)
            setShowAddRmCat(false);
        }).catch((error) => {
            alert(`Error 2 : ${error}.`);
        });
    }
    return (
        <div id="categories">
            <h4>Categories</h4>
            {showAddRmCat ? <button onClick={() => setShowAddRmCat(false)}>Hide Add Category</button> : <button onClick={() => setShowAddRmCat(true)}>Show Add Category</button>}
            {showAddRmCat ? <AddRmCat addCat={addCat} setNewCat={setNewCat} /> : null}
            <ul>
                <li onClick={catClick}>Cat One</li>
                <li onClick={catClick}>Cat two</li>
                <li onClick={catClick}>Cat three</li>
            </ul>
        </div>
    )
}
export default Categories;