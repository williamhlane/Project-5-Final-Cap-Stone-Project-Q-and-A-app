import { useState } from 'react';
const LoginScreen = ({setShowLogIn, backEnd }) => {
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);
    const logIn = async (e) => {
        e.preventDefault();
        await fetch (`${backEnd}/users/login`, {
            
        }).then((n) => {

        })
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