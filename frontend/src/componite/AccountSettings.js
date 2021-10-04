import { useState } from 'react';

const AccountSettings = ({ appState2, backEnd, setShowAccountSettings }) => {
    const [delUserCheck, setDelUserCheck] = useState(false);
    const [newPassword1, setNewPassword1] = useState();
    const [newPassword2, setNewPassword2] = useState();
    const [changePasswordCheck, setChangePasswordCheck] = useState(false);
    const deleteUser = async (e) => {
        e.preventDefault();
        if (delUserCheck === true) {
            const body = `{ "username" : "${appState2.username}" }`;
            await fetch(`${backEnd}/users`, {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body,
            }).then(res => res.json())
                .then((res) => {
                    alert(`${res.results}`)
                    window.location.href = "/";
                }).catch((error) => {
                    alert(`Error 2 : ${error}.`)
                })
        } else {
            alert("Please check that box next to");
        }
    }
    const changePassword = async (e) => {
        e.preventDefault();
        if (changePasswordCheck) {
            if (newPassword1 === newPassword2) {
                const body = `{ "username" : "${appState2.username}", "newpassword" : "${newPassword1}" }`;
                await fetch(`${backEnd}/users`, {
                    method: 'PUT',
                    mode: 'cors',
                    credentials: 'include',
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
                        document.getElementById('newpassword1').value = '';
                        document.getElementById('newpassword2').value = '';  
                        document.getElementById("cpcheck").checked = false;                     
                    }).catch((error) => {
                        alert(`Error 2 : ${error}.`);
                    })
            } else {
                alert("The two passwords do not match.");
            }
        } else {
            alert("Please check the check box to confirm you want to change the password.");
        }
    }
        return (
            <div id="userAccountMain">

                <div id="userAccountInner">
                    <div>
                        <a className="linkClose" onClick={() => setShowAccountSettings(false)} >Close</a>
                        <h3 className="h3Title">User Settings for {appState2.username}</h3>

                        <form onSubmit={deleteUser}>
                            <label className="userSettingsLabel">Delete User. Check the box to confirm you are sure.</label>
                            <input type="checkbox" onChange={() => setDelUserCheck(!delUserCheck)} />
                            <input type="submit" value="Delete USER!" />
                        </form>
                        <hr />
                        <form onSubmit={changePassword}>
                            <label className="userSettingsLabel">Change Password</label>
                            <label className="userSettingsLabel">Enter the new password.</label>
                            <input type="password" name="newpassword1" className="settingsTextInput" id="newpassword1"  onChange={(e) => setNewPassword1(e.target.value)} />
                            <label className="userSettingsLabel"> Please re-enter your new password.</label>
                            <input type="password" name="newpassword2" className="settingsTextInput" id="newpassword2" onChange={(e) => setNewPassword2(e.target.value)} />
                            <input type="checkbox" id="cpcheck" onChange={() => setChangePasswordCheck(!changePasswordCheck)} />
                            <input type="submit" value="Change Password" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    export default AccountSettings;