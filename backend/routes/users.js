/*
	File: 		users.js
	Date: 		2024/08/29
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		JavaScript file that defines the api routes
                for accessing /users
*/

const router = require('express').Router();
let User = require('../models/user.model');

// get request for listing all users from /users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


// find user by username
router.route('/:username').get((req, res) => {
    User.find({username: req.params.username}).select({_id: 0})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// post request for posting new user to /users/add
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({username, password});

    newUser.save()
        .then(() => res.json('User account has been added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete request
router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;