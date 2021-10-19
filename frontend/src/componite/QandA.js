import { useState } from "react";
const QandA = ({ currentCat, appState2, backEnd, catList }) => {
    const [qListFetched, setQListFetched] = useState(false);
    const [qList, setQList] = useState([{ id: ' ', question: ' ', byWho: ' ', answered: ' ', whatCatID: ' ' }]);
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
    const Qbox = ({ question }) => {

        return (
            <>
                <h3>{question.question}</h3>
                <ul>
                    <li key='1' className="answer">Answers Here</li>
                </ul>
                <input type="text" />
            </>
        )
    }




    return (
        <div>

            <div id="questionlist">
                <h4>Question List for category: {catList.map((el, index) => (
                    el.id === currentCat ? el.catName : null
                ))}</h4>
                {
                    qList.map((question, index) => (
                        <div className='selectQuestionDiv' key={index} onClick={() => setSelectedQuestion(question.id)}>{question.whatCatID === currentCat ? question.question : null}</div>
                    ))
                }
            </div>

            <div className="question">{qList.map((question, index) => (
                question.id === selectedQuestion && question.whatCatID === currentCat ? <Qbox question={question} /> : null
            ))}</div>


        </div>

    )
}
export default QandA;

