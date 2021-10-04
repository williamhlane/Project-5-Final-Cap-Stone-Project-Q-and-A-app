import { useState } from 'react';

const AccountSettings = ({ appState2, backEnd, setShowAccountSettings }) => {
    const [delUserCheck, setDelUserCheck] = useState(false);
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
                    if(res.error !== "true"){
                        window.location.href = "/";
                    } else {
                        alert("An error has occurred, please try again.");
                    }

                }).catch((error) => {
                    alert(`Error 2 : ${error}.`)
                })
        } else {
            alert("Please check that box next to");
        }
    }
    /*LEFT OFF DEELTE REQUEST IS COMMING BACK WITH A 500*/
    return (
        <div id="userAccountMain">
            
            <div id="userAccountInner">
                <div>
                <a className="linkClose" onClick={() => setShowAccountSettings(false)} >Close</a>
            <h3 className="h3Title">User Settings for {appState2.username}</h3>
            
                <form onSubmit={deleteUser}>
                    <label className="userSettingsLabel">Delete User</label>
                    <input type="checkbox" onChange={() => setDelUserCheck(!delUserCheck)} />
                    <input type="submit" value="Delete USER!" />
                </form>
                </div>
            </div>
        </div>
    )
}
export default AccountSettings;