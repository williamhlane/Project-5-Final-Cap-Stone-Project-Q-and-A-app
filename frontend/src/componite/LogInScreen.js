const LoginScreen = () => {
    const logIn = (e) => {
        e.preventDefault();

    }
    return(
        <div id="logInScreen"> 
        <div id="innerLogInScreen">


            <form onSubmit={logIn}>
                <label>Username:</label>
                <input type="text" name="username" />
                <label>Password:</label>
                <input type="password" name="password" />
                <input type="submit" value="Log In" id="logInButton"/>
                <a id="resetLink" href="./resetpassword">Reset Password</a>            <a href="./">X</a>
            </form>
            </div>

        </div>
    )
}
export default LoginScreen;