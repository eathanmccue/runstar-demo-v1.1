const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// define user schema 
const userSchema = new Schema({
    username: {type: String, unique: true, required: true, dropDups: true },
    password: {type: String, required: true}
}, {
    timestamps: false,
});
  
const User = mongoose.model('User', userSchema);

module.exports = User;