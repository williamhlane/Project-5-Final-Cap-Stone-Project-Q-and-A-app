import { useState } from "react";
import AddRmCat from "./AddRmCat";

const Categories = ({ appState2, backEnd, setCurrentCat, catList, setCatList, setCatListFetched, catListFetched }) => {
    const [showAddRmCat, setShowAddRmCat] = useState(false);
    const [newCat, setNewCat] = useState();
    const [delCat, setDelCat] = useState();
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
            setCatListFetched(false);
            setShowAddRmCat(false);
        }).catch((error) => {
            alert(`Error 2 : ${error}.`);
        });
    }
    const delCatFunc = async (e) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to delete ${delCat}?`)) {
            const body = `{ "username" : "${appState2.username}", "delCategoryID" : "${delCat}" }`;
            await fetch(`${backEnd}`, {
                method: 'DELETE',
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
                setCatListFetched(false);
                setShowAddRmCat(false);
            }).catch((error) => {
                alert(`Error 2 : ${error}.`);
            });
        }
    }

    if (!catListFetched) {
        fetch(`${backEnd}?dowhat=listcategories`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }).then((responce) => {
            return responce.json();
        }).then((list) => {
            setCurrentCat(list[0].id);
            setDelCat(list[0].id);
            setCatList(list);
            setCatListFetched(true);
        }).catch((error) => {
            console.log(error);
        });
    }
    //NOTES ADD CATEGORY RENAME LATER
    return (
        <div id="categories">
            <h4>Categories</h4>
            {showAddRmCat ? <button onClick={() => setShowAddRmCat(false)}>Hide Add Category</button> : <button onClick={() => setShowAddRmCat(true)}>Show Add Category</button>}
            {showAddRmCat ? <AddRmCat addCat={addCat} setNewCat={setNewCat} catList={catList}
                setDelCat={setDelCat} delCatFunc={delCatFunc} appState2={appState2} /> : null}
            <ul>
                {catList.map((element, index) => (
                    <li onClick={() => setCurrentCat(element.id)} key={index}>{element.catName}</li>
                ))}
            </ul>
        </div>
    )
}
export default Categories;