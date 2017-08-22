var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new mongoose.Schema({
    customerId: Schema.Types.ObjectId,
    name: String,
    type: String,
    description: String,
    address: String
});

groupSchema.index({ customerId: 1, type: 1, name: 1}, { unique: true });

module.exports = mongoose.model('Group', groupSchema);
