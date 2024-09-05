/*
	File: 		Footer.jsx
	Date: 		2024/08/25
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		React component for the app footer.
                Contains a link to the Runstar website.
*/

import './App.css';
import { GoDotFill } from "react-icons/go";

// component function
function Footer(){
    // component structure
    return(
        <div className='footer'>
            <p>Runstar Web Application</p>
            <GoDotFill size={12} className='dot' />
            <a href="http://runstarservices.com">runstarservices.com</a>
        </div>
    );
}

export default Footer;