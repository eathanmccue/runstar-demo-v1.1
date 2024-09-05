const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// define customer schema 
const customerSchema = new Schema({
    clientName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: false},
    address: {type: String, required: false}
}, {
    timestamps: true,
});
  
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;