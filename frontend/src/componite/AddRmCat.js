import { useState } from "react";
const AddRmCat= ({addCat, setNewCat}) => {



    return (
        <div id="AddRemoveCat">
            <label>Note you can only remove Categories you own.</label>
        <form onSubmit={addCat}>
            <input type="text" onChange={(e) => setNewCat(e.target.value)} />
            <input type="Submit" />
        </form>
        </div>
    )
}
export default AddRmCat;