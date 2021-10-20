
const AddRmCat= ({addCat, setNewCat, catList, setDelCat, delCatFunc, appState2}) => {
    
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
                {catList.map((cat, index) => (
                   cat.owner === appState2.username ? <option key={index} value={cat.id}>{cat.catName}</option> : null
                ))}
            </select>
            <input type="submit" />
        </form>
        </div>
    )
}
export default AddRmCat;