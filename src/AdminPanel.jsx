/*
	File: 		AdminPanel.jsx
	Date: 		2024/08/25
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		React act component that is rendered when clicking the
                username on the right of the Nav component.
                For admin: Renders admin control panel for adding and
                removing system users.
                For everyone: Renders the log out button.
*/

import './App.css';
import { useEffect, useState } from 'react';
import { LuUserPlus2, LuUserX2, LuUser2 } from "react-icons/lu";

// component function
function AdminPanel(props){

    // state variables
    const [users, setUsers] = useState([]);

    // runs on render / when users is updated
    useEffect(() => {
        fetch('http://localhost:5000/users', {
            method: 'GET'
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setUsers(data);
            return data;
        }).then((data) => {
            hideAdmin(data);
        })
    }, [users]);

    // for removing admin from the user list 
    // to prevent accidental deletion
    function hideAdmin(data){
        // remove admin from user list
        let newUsersArr = [];
        for(var i = 0; i < data.length; i++){
            // check if admin, do not add admin to new arr
            if((data[i].username !== "admin")){
                newUsersArr.push(data[i]);
            }
        }
        // set new user array as users to display
        setUsers(newUsersArr);
    };

    // clear the current delete user selection
    function clearUsername(event){
        event.preventDefault();
        document.getElementById('deleteUserId').innerHTML = 'None selected';
        document.getElementById('deleteUserName').innerHTML = '';
    }

    // set a user to be deleted
    function setDelete(id, username){
        document.getElementById('deleteUserId').innerHTML = id;
        document.getElementById('deleteUserName').innerHTML = username;
    }

    // button handler for deleting the selected
    function deleteUser(event){
        event.preventDefault(); // stop reload

        // notification elements
        let userRemoved = document.getElementById('userRemoved');
        let noneSelected = document.getElementById('noneSelected');

        // get user ID from element innerHTML
        const userId = document.getElementById('deleteUserId').innerHTML; 

        // if a user is selected
        if(userId !== "None selected"){
            // delete user
            try{
                fetch("http://localhost:5000/users/delete/" + userId, {
                    method: 'DELETE',
                });

                // clear form values
                document.getElementById('deleteUserId').innerHTML = 'None selected';
                document.getElementById('deleteUserName').innerHTML = '';

                // display success message
                userRemoved.style.display = 'block';
                setTimeout(() => {
                    userRemoved.style.display = 'none';
                }, 5000);
            }
            catch(e){
                console.log(e); // get error
            }
        }
        else{
            // no user has been selected
            // display noneSelected error notification
            noneSelected.style.display = 'block';
            setTimeout(() => {
                noneSelected.style.display = 'none';
            }, 5000);
        }
    }

    // handler for adding a new user
    function addUser(event){
        event.preventDefault(); // stop reload

        // reference notification elements
        let thisForm = document.getElementById('addUserForm');
        let userAdded = document.getElementById('userAdded');
        let userExists = document.getElementById('userExists');

        // check new username is unique
        for(var i = 0; i < users.length; i++){
            // if new username matches existing username
            if(users[i].username === event.target[0].value.toLowerCase()){
                // username already exists
                // display error notification
                userExists.style.display = 'block';
                setTimeout(() => {
                    userExists.style.display = 'none';
                }, 5000);

                return;
            }
        }

        // username is unique
        // send POST request with user details in JSON
        try{
            fetch("http://localhost:5000/users/add", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: '' + event.target[0].value.toLowerCase(),
                    password: '' + event.target[1].value
                })
            });

            thisForm.reset(); // clear form values

            // display success notification
            userAdded.style.display = 'block';
            setTimeout(() => {
                userAdded.style.display = 'none';
            }, 5000);
            
        }
        catch(e){
            console.log(e); // get error
        }
    }

    // component structure
    return (
        <div className='main adminPanel'>

            <div className='notification'>
                <div className='success' id='userRemoved'><p>User removed successfully.</p></div>
            </div>

            <div className='notification'>
                <div className='success' id='userAdded'><p>User added successfully.</p></div>
            </div>

            <div className='notification'>
                <div className='failure' id='userExists'><p>Username already exists.</p></div>
            </div>

            <div className='notification'>
                <div className='failure' id='noneSelected'><p>No user selected.</p></div>
            </div>

            { // if user is admin
            props.username === 'admin' ? 
            
            // then show admin options
            <div className='adminContainer'>
                <form id='addUserForm' onSubmit={addUser}>
                    <div className='title'><h5>Create a new system user</h5><LuUserPlus2 className='icon' size={26}/></div>
                    <label>username</label>
                    <input type='text' placeholder='username' name="user"></input>

                    <label>password</label>
                    <input type='text' placeholder='password' name="pass"></input>

                    <button type="submit">Add</button>

                    
                </form>

                <form id='deleteUserForm' onSubmit={deleteUser}>
                    <div className='title'><h5>Remove a system user</h5><LuUserX2 className='icon' size={26}/></div>
                    
                    <div className="inputLine">
                        <label>ID:</label>
                        <p id="deleteUserId" type="text" readOnly name="user">None selected</p>
                    </div>

                    <div className="inputLine">
                        <label>username:</label>
                        <p id="deleteUserName" type="text" readOnly name="user"></p>
                    </div>

                    <div>
                        <button type="submit">Delete</button>
                        <button onClick={clearUsername}>Clear</button>
                    </div>
                </form>

                <div className="userList">
                    <div className='title'><h5>Current users</h5><LuUser2 className='icon' size={22} /></div>
                    {users.map((user) => (
                        <div className='user' key={user._id} onClick={() => setDelete(user._id, user.username)}>
                            <p>{user.username}</p>
                        </div>
                    ))}
                </div>
            </div> // end admin options

            : // if user is not admin, show nothing
            <> {/* nothing is rendered here */} </>
            }

            {/* render sign out button */}
            <div className='signOut'>
                <p>Currently signed in as {props.username}</p>
                <button onClick={props.signOut}>Sign out</button>
            </div>
        </div>
    )
}

export default AdminPanel;