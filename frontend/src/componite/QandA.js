import { useState } from "react";
import Qbox from "./Qbox";
const QandA = ({ currentCat, appState2, backEnd, catList, qListFetched, setQListFetched, qList, setQList}) => {

    const [selectedQuestion, setSelectedQuestion] = useState();
    if (!qListFetched) {
        fetch(`${backEnd}?dowhat=listquestions&currentCat=${currentCat}&username=${appState2.username}`, {
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
            setQList(res2);

            setQListFetched(true);
        }).catch((error) => {
            alert(`Error 2 : ${error}.`);
        });
    }
    return (
        <div>

            <div id="questionlist">
                <h4>Question List for category: {catList.map((el, index) => (
                    el.id === currentCat ? el.catName : null
                ))}</h4>
                {
                    qList.map((question, index) => (
                        question.whatCatID === currentCat ? <div className='selectQuestionDiv' key={index} onClick={() => setSelectedQuestion(question.id)}>{question.question}-Answered? {question.answered === 'true' ? 'Yes' : "No"}</div> : null
                    ))
                }
            </div>
            <div className="question">{qList.map((question, index) => (
                question.id === selectedQuestion && question.whatCatID === currentCat ? <Qbox key={index} question={question} appState2={appState2} backEnd={backEnd} currentCat={currentCat} setQListFetched={setQListFetched} /> : null
            ))}</div>


        </div>

    )
}
export default QandA;

