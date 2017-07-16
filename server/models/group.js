var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new mongoose.Schema({
    customerId: Schema.Types.ObjectId,
    name: String,
    type: String,
    description: String,
    address: String
});

module.exports = mongoose.model('Group', groupSchema);
