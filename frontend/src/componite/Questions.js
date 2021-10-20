import QandA from './QandA';
import { useState } from 'react';
const Questions = ({currentCat, appState2, backEnd, setCurrentCat, catList }) => {
    const [newQuestion, setNewQuestion] = useState();

const ask = async (e) => {
    e.preventDefault();
    document.getElementById('askQuestionText').value = '';
    const body = `{ "username" : "${appState2.username}", "currentCat" : "${currentCat}", "newQuestion" : "${newQuestion}" }`;
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
    }).catch((error) => {
        alert(`Error 2 : ${error}.`);
    });
    
}


    return (
        <div id="questions">
            <h3>Questions</h3>
            
            <div>

                <form onSubmit={ask}>
                    <label>Ask a Question!</label><br />
                    <textarea id="askQuestionText" onChange={(e) => setNewQuestion(e.target.value)} placeholder="Type your question here."></textarea><br />
                    <input type="submit" value="Ask!" />
                </form>

            </div>

            <QandA appState2={appState2} backEnd={backEnd} setCurrentCat={setCurrentCat}  currentCat={currentCat} catList={catList} />

        </div>
    )
}
export default Questions;