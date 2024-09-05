/*
	File: 		Nav.jsx
	Date: 		2024/08/29
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		React component for the navigation bar.
                This component is rendered directly by
                App.jsx, allowing it to be visible from
                anywhere within the app. 
*/

import './App.css'
import { Link } from 'react-router-dom'; 
import { LuUserCircle2 } from "react-icons/lu";

// component function
function Nav(props){
    return(
        <div className="nav">
            {/* nav pages */}
            <ul>
                <Link className="navLink" to="/">Home</Link>
                <Link className="navLink" to="/jobs">Jobs</Link>
            </ul>
            {/* username button for accessing user settings */}
            <div className='navUser'>
                <Link to="/settings" className='linkContainer'>
                    <LuUserCircle2 size={26} />
                    <p>{props.username}</p>
                </Link>
            </div>
        </div>
    );
}

export default Nav;