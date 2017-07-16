var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new mongoose.Schema({
    name: String,
    address: String,
    description: String,
    createAt: {type: Date, default: Date.now },
    nLimit: Number
});

module.exports = mongoose.model('Customer', customerSchema);
