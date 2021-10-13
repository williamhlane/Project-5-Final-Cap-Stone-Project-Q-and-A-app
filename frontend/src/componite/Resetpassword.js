import { useState } from "react";

const Resetpassword = ({ backEnd }) => {
    const [userList, setUserList] = useState();
    const [userName, setUserName] = useState();
    const [answer, setAnswer] = useState();
    const [newPassword1, setNewPassword1] = useState();
    const [newPassword2, setNewPassword2] = useState();
    let showQandP = false;
    let secretQuestion = '';
    fetch(`${backEnd}/users`).then((list) => {
        return list.json();
    }).then((list) => {
         if (typeof (userList) === "undefined") {
            setUserList(list);
        }
    }).catch((error) => {
        console.log(error);
    });
    const resetPassword = async (e) => {
        e.preventDefault();
              if (newPassword1 === newPassword2) {
                const body = `{ "username" : "${userName}", "newpassword" : "${newPassword1}", "answer" : "${answer}" }`;
                await fetch(`${backEnd}/users/resetpassword`, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: body,
                }).then(res => res.json())
                    .then((res) => {
                        if(res.results === "1"){
                            alert(`The password was updated successfully.`);
                        } else {
                            alert(`An error has occured, if you get this message your password was not updated.`);
                        }
                        document.getElementById('newPassword1').value = '';
                        document.getElementById('newPassword2').value = '';    
                        document.getElementById('answer').value = '';               
                    }).catch((error) => {
                        alert(`Error 2 : ${error}.`);
                    })
            } else {
                alert("The two passwords do not match.");
            }
    }
    if (typeof (userList) !== "undefined") {     
        if (typeof (userList[userName]) !== "undefined") {
            showQandP = true;
            secretQuestion = userList[userName].secretQuestion;
        }
    }
    return (

        <div id="resetScreen">
            <div id="innerResetScreen">
                <form onSubmit={resetPassword}>
                    <span href="#" className="resetFormLink" onClick={() => setUserName(null)}>Reset form. </span><a className="resetLink" href="/"> Close.</a>
                    {showQandP ? null: <label>Enter your username to start: </label>}
                    {showQandP ? <label>Username: {userName} </label> : <input type="text" onChange={(e) => setUserName(e.target.value)} />}
                    {showQandP ? <label>Answer this question:</label> : null}
                    {showQandP ? <label>{secretQuestion}</label> : null}
                    {showQandP ? <input type="text" id="answer" name="answer" onChange={(e) => setAnswer(e.target.value)} /> : null}
                    {showQandP ? <label>Enter your new password twice.</label> : null}
                    {showQandP ? <input type="password" id="newPassword1" name="newPassword1" onChange={(e) => setNewPassword1(e.target.value)} /> : null}
                    {showQandP ? <input type="password" id="newPassword2" name="newPassword2" onChange={(e) => setNewPassword2(e.target.value)} /> : null}
                    {showQandP ? <input type="submit" value="Reset Password" id="resetbutton" /> : null}
                </form>

            </div>
        </div>
    )
}
export default Resetpassword;
