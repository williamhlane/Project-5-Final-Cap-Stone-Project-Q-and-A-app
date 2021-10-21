import { useState } from "react";
const Qbox = ({ question, appState2, currentCat, backEnd, setQListFetched }) => {
    const [newAnswer, setNewAnswer] = useState();
    const [answersList, setAnswersList] = useState(false);
    const [answerArray, setAnswerArray] = useState([]);
    const submitAnswer = async (e) => {

        e.preventDefault();
        document.getElementById("answerText").value = '';
        const body = `{ "username" : "${appState2.username}", 
                        "newAnswer" : "${newAnswer}", "toWhat" : "${question.id}", 
                            "whatCatID" : "${currentCat}", "byWho" : "${appState2.username}" }`;
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
            alert(`${res2.results}`);
            setQListFetched(false);
            setAnswersList(false);
        }).catch((error) => {
            alert(`Error 2 : ${error}.`);
        });
       await setQListFetched(false);
    }
    if(!answersList) {
        fetch(`${backEnd}?dowhat=listanswers&currentCat=${currentCat}&username=${appState2.username}&questionId=${question.id}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.json();
        }).then((res2) => {
            
            setAnswerArray(res2);
            setAnswersList(true);
        }).catch((error) => {
            alert(`Error 2 : ${error}.`);
        });
    }
    const deleteQuestion = async (id) => {
        if (window.confirm(`Are you sure you want to delete this quetion?`)) {
            const body = `{ "username" : "${appState2.username}", "delQuestionID" : "${id}" }`;
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
                window.location.reload();
            }).catch((error) => {
                alert(`Error 2 : ${error}.`);
            });
            await setQListFetched(false);
        }
    }
    const deleteAnswer = async (id) => {
        if (window.confirm(`Are you sure you want to delete this answer?`)) {
            const body = `{ "username" : "${appState2.username}", "delAnswerID" : "${id}" }`;
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
                setAnswersList(false);
            }).catch((error) => {
                alert(`Error 2 : ${error}.`);
            });
            await setQListFetched(false);
        }
    }
    return (
        <>
            <h3>{question.question}</h3>
            <h4 id="byWhoh4">asked by {question.byWho}</h4>
          { appState2.username === question.byWho ? <button onClick={() => deleteQuestion(question.id)}>Delete Question</button> : null }
            <ul>{answerArray.map((a, index) => ( 
                <li key={index} className="answer">{a.answer}<br /> by {a.byWho}-{a.createdAt.substring(0, 25)}{appState2.username === a.byWho ?<button onClick={() => deleteAnswer(a.id)}>Delete</button> : null}</li>
            ))}
            </ul>
            <form onSubmit={submitAnswer}>
                <input id="answerText" type="text" onChange={(e) => setNewAnswer(e.target.value)} />
                <input type="submit" />
            </form>
        </>
    )
}
export default Qbox;