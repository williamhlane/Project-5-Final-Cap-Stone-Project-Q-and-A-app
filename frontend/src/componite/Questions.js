import QandA from './QandA';
const Questions = () => {

let currentCat = "Categories";
    return (
        <div id="questions">
            <h3>Questions</h3>
            <h4>{currentCat}</h4>
            <div>
                <form>
                    <label>Search</label>
                    <input type="search" name="search" id="searchTextBox" placeholder="Search for a Question" />
                    <input type="submit" value="GO!" />
                </form>
            </div>
            <QandA />

        </div>
    )
}
export default Questions;