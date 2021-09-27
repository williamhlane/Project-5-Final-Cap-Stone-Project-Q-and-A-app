import { useState } from 'react';
const LoginScreen = ({setShowLogIn, backEnd, appState ,setappState }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const logIn = async (e) => {
        e.preventDefault();
        const body = `{ "username" : "${username}", "password" : "${password}" }`;
        await fetch (`${backEnd}/users`, {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: body,
                }).then(res => res.json())
                .then((res) => {
                    if (res.authenticated === "true") {
                       //appState.app
                        //setAppState(JSON.parse(JSON.stringify(res)));
                    } else {
                        alert(`Error: ${res.status}`);
                    }
                    
                }).catch((error) => {
                    alert(`Error 2 : ${error}.`)
                })
                setShowLogIn(false);
        
            
    }
    return(
        <div id="logInScreen"> 
        <div id="innerLogInScreen">


            <form onSubmit={logIn}>
                <label>Username:</label>
                <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
                <label>Password:</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Log In" id="logInButton"/>
                <a id="resetLink" href="./resetpassword">Reset Password</a>   
                <a onClick={() => setShowLogIn(false)} id="closeLink">Close</a>
            </form>
            </div>

        </div>
    )
}
export default LoginScreen;