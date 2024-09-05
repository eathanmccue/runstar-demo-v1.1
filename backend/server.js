/*
	File: 		server.js
	Date: 		2024/08/25
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		The main server file. This file needs to be run for
                the React front end to be able to reach MongoDB and
                Google's Distance Matrix API. This file defines all
                the API routes and opens a connection to MongoDB.
*/

const express = require('express');     // node server
const cors = require('cors');           // middleware
const mongoose = require('mongoose');   // mongoDBc node package
const axios = require('axios');         // http requests

require('dotenv').config();             // environment variables

// server & ports
const app = express();  
const port = process.env.PORT || 5000;

// midleware setup
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;  // MongoDB connection key
mongoose.connect(uri);              // open connection to MongoDB

// display success message
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
});

// model files
const jobsRouter = require('./routes/jobs');
const customersRouter = require('./routes/customers');
const usersRouter = require('./routes/users');

// routes
app.use('/jobs', jobsRouter);
app.use('/customers', customersRouter);
app.use('/users', usersRouter);

// start listening for connections on port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// google distance matrix API request from client
app.get("/api/distance", async (req, res)=> {
    // get origins and destination locations from client request
    const {origins, destinations} = req.query;
    
    try{
        const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", { 
            params: {
                origins,
                destinations,
                key: process.env.GOOGLE_KEY
            }
        });
        res.json(response.data);                // return response
    
    }catch(error){
    
        res.status(500).send(error.toString()); // return error
    
    }
}); 

// end server.js

