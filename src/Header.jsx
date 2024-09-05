/*
	File: 		Header.jsx
	Date: 		2024/08/25
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		React component for the app header.
                Contains a title and Runstar logo image.
*/

import './App.css';
import logo from './assets/images/logo.svg';

function Header(props){
    return(<div>
            <div className='header'>
                <h1 className='title'>{props.title}</h1>
                <div className='logo'>
                    <img src={logo} alt='Runstar Logo' />
                </div>
            </div>
        </div>
    );
}

export default Header;