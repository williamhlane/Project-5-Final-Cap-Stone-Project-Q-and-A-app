import { useState } from 'react';
const CreateUserScreen = ({ setShowCreateUser, backEnd }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [secretQuestion, setSecretQuestion] = useState("What is your favorite color?");
    const [secretAnswer, setSecretAnwser] = useState();
    let body = `
        {
            "createusername" : "${username}",
            "createpassword" : "${password}",
            "secretquestion" : "${secretQuestion}",
            "secretanswer" : "${secretAnswer}"

        }
    `;
    const createUser = async (e) => {
        e.preventDefault();
        if(password === password2){
        await fetch(`${backEnd}/users/createuser`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.status !== "success") {
                alert(`Error : ${res.status}.`);
            } else {
                alert(`The user ${res.username} has been successfully created.`);
            }
            setShowCreateUser(false);
        }).catch((error) => {
            alert(`Error ${error}.`)
        })
    } else {
        alert ("The passwords do not match.");
    }
    }
    return (
        <div id="createUserScreen">
            <div id="innerCreateUserScreen">
                <form onSubmit={createUser}>
                    <label>Username:</label>
                    <input type="text" id="createusername" name="username" onChange={(e) => setUsername(e.target.value)} />
                    <label>Password:</label>
                    <input type="password" id="createpassword" name="password" onChange={(e) => setPassword(e.target.value)} />
                    <label>Retype Password:</label>
                    <input type="password" id="createpassword2" name="password" onChange={(e) => setPassword2(e.target.value)} />
                    <label>Secret Question.</label>
                    <select onChange={(e) => setSecretQuestion(e.target.value)}>
                        <option>
                            What is your favorite color?
                        </option>
                        <option>
                            What is your mothers maiden?
                        </option>
                        <option>
                            What is your favorite color?
                        </option>
                    </select>
                    <input type="text" name="answer" onChange={(e) => setSecretAnwser(e.target.value)} />
                    <input type="submit" value="Create User" id="logInButton" />
                    <a onClick={() => setShowCreateUser(false)} id="closeLink">Close</a>
                </form>
            </div>

        </div>
    )
}
export default CreateUserScreen;