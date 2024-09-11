/*
	File: 		Login.jsx
	Date: 		2024/08/25
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		React component for the login page.
                This component is rendered by App.jsx if there is
                no username stored in the browsers session storage.
*/

import './App.css';
import { useEffect, useState } from 'react';
import logo from './assets/images/logo.svg';

// component function
function Login(props){
    const [users, setUsers] = useState(null);       // get a list of possible users
    const [inputUser, setInputUser] = useState(''); // state variable for holding input username
    const [inputPass, setInputPass] = useState(''); // state variable for holding input password

    // called upon clicking login button
    function handleSubmit(event){
        event.preventDefault(); // prevent default form submission

        // get notoficiation HTML element by id
        const notification = document.getElementById('noti');

        // for each username/password pair
        users.forEach((u) => {
            // if username and password match a database record
            if(inputUser === u.username && inputPass === u.password){
                props.signIn(inputUser); // sign in
            }
            else{
                // username and password do not match a database record
                notification.style.display = "block"; // show error notification

                // hide notification after 5s
                setTimeout(() => {
                    notification.style.display = "none"
                }, 5000);
            }
        });
    }

    // fetch users
    useEffect(() => {
        fetch("http://localhost:5000/users/", {
            method: 'GET'
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setUsers(data); // save to state variable
        });
    });

    // input handler for admin password input
    function handleAdminPass(event){
        let input = event.target.value; // get input value

        // erase guest credentials
        let guestPassInput = document.getElementById('guestPass');
        let guestNameInput = document.getElementById('guestName');
        guestPassInput.value = "";
        guestNameInput.value = "";

        // update inputted admin password, set user to admin
        setInputUser('admin');
        setInputPass(input);
    }

    // input handler for guest username input
    function handleGuestUser(event){
        let input = event.target.value; // get input value

        // update guest username
        setInputUser(input);
    }

    // input handler for guest password input
    function handleGuestPass(event){
        let input = event.target.value; // get input value

        // erase admin password
        let adminPassInput = document.getElementById('adminPass');
        adminPassInput.value = "";

        // update inputted guest password
        setInputPass(input);
    }

    // component structure
    return(
        <>
        <div className='notification'>
            <div className='failure' id='noti'><p>Incorrect username or password.</p></div>
        </div>

        <div className="main">
            <form onSubmit={handleSubmit}>
                <div className='login'>

                    {/* display logo */}
                    <div className='logo'>
                        <img src={logo} alt={'Runstar logo'} />
                    </div>

                    {/* login boxes */}
                    <div className='gridContainer'>

                        {/* admin */}
                        <div>
                            <label>Admin</label>
                            
                            <input id='adminPass' type="text" placeholder='password' autoCapitalize='off' onChange={(event) => handleAdminPass(event)} />
                            
                        </div>

                        {/* guest */}
                        <div className='pass'>
                            <label>Guest</label>
                            <input id='guestName' type="text" placeholder='username' autoCapitalize='off' onChange={handleGuestUser} />
                            
                            <input id='guestPass' type="text" placeholder='password' autoCapitalize='off' onChange={handleGuestPass} />
                            
                        </div>

                        {/* login button */}
                        <div className='loginBtn'>
                            <button type="submit">Log in</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default Login;