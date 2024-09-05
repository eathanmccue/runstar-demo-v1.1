/*
	File: 		customers.js
	Date: 		2024/08/29
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		JavaScript file that defines the api routes
                for accessing /customers
*/

const router = require('express').Router();
let Customer = require('../models/customer.model');

// get request for listing all customers from /customers
router.route('/').get((req, res) => {
    Customer.find() // add parameters to find command to change which fields are returned (default all fields returned)
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err));
});

// post request for posting new customer to /customers/add
router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;   // customer first name  [required]
    const lastName = req.body.lastName;     // customer last name   [required]
    const email = req.body.email;           // customer email       [required]
    const phone = req.body.phone;           // customer phone       [optional]

    const newCustomer = new Customer({firstName, lastName, email, phone});

    newCustomer.save()
        .then(() => res.json('Customer added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// routes for crud actions
router.route('/:id').get((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(customer => res.json('Customer deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => {
            const clientName = req.body.clientName;
            const email = req.body.email;
            const phone = req.body.phone;
            const address = req.body.address;

            customer.save()
                .then(() => res.json('Customer updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;