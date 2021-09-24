const Resetpassword = () => {
    const resetpassword = (e) => {
        e.preventDefault();

    }
    return(
        <div id="resetScreen"> 
        <div id="innerResetScreen">

            <form onSubmit={resetpassword}>
                <label>Username:</label>
                <input type="text" name="username" />
                <label>Answer one of these questions.</label>
                <select name="securityQuestion">
                    <option>What was your first pets name?</option>
                    <option>Where is your mothers maiden name?</option>
                    <option>Where did you go to high school?</option> 
                </select>
                <input type="text" name="answer" />
                <input type="submit" value="Reset Password" id="resetbutton"/>
                <a href="./" id="closeLink">Close</a>
            </form>
            
            </div>

        </div>
    )
}
export default Resetpassword;