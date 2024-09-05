/*
	File: 		App.jsx
	Date: 		2024/08/25
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		React App parent component. Rendered by index.js
				Used for routing to different paths and contains the
				logic for rendering the correct children components.
*/

import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
// components
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import Jobs from './Jobs';
import ViewJob from './ViewJob';
import Login from './Login';
import AdminPanel from './AdminPanel';
import EditForm from './EditForm';
import EstimateForm from './EstimateForm';

function App() {
	// look for existing username in local storage
	const [user, setUser] = useState(window.sessionStorage.getItem('ug&G&ub7df65dYFV&FD^d4rjYF2dadcTHNWAt3'));

	// sign in function saves username to local storage
	function signIn(username, password){
		window.sessionStorage.setItem('ug&G&ub7df65dYFV&FD^d4rjYF2dadcTHNWAt3', username); // save to local storage

		setUser(username); // update user state with username
	}

	// sign out function removes username from local storage
	function signOut(){
		window.sessionStorage.removeItem('ug&G&ub7df65dYFV&FD^d4rjYF2dadcTHNWAt3'); // remove from local storage

		setUser(null); // update user state to null

		window.location.href = '/'; // return to home page
	}

	// Component HTML structure
	return (
		<Router>
			{/* 
				if user is not null -> render the app component
				else -> render the login component
			*/}
			{user ? <div className="app">
				<Header title="Runstar Management System" /> 
				<Nav username={user} signOut={signOut} />
				
				<Routes>
					<Route path='/' element={<EstimateForm username={user} /> } /> 
					<Route path='/jobs' Component={Jobs} />
					<Route path='/jobs/view' Component={ViewJob} />
					<Route path='/jobs/update' Component={EditForm} />
					<Route path='/settings' element={<AdminPanel username={user} signOut={signOut} />} />
				</Routes>

				<Footer />
			</div> : <Login signIn={signIn} />}
		</Router>
	);
}

export default App;