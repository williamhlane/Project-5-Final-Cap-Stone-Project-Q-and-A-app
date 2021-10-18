
const AddRmCat= ({addCat, setNewCat, catList, setDelCat, delCatFunc, appState2}) => {
    let list = [];
    for (const property in catList) {
        if(catList[property].owner === appState2.username){
            list.push(property);
        }
      }


    return (
        <div id="AddRemoveCat">
            <label>Note you can only remove Categories you own.</label>
        <form onSubmit={addCat}>
            <input type="text" onChange={(e) => setNewCat(e.target.value)} />
            <input type="Submit" />
        </form>
        <form onSubmit={delCatFunc}>
            <label>
                Delete a category.
            </label>
            <select onChange={(e) => setDelCat(e.target.value)}>
                {list.map((catName, index) => (
                    <option key={index}>{catName}</option>
                ))}
            </select>
            <input type="submit" />
        </form>
        </div>
    )
}
export default AddRmCat;