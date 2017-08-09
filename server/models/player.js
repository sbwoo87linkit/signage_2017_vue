var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new mongoose.Schema({
  groupId: Schema.Types.ObjectId,
  name: String,
  mode: String,
  description: String,
  // address: String,
  createAt: {type: Date, default: Date.now},
  updateAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('Player', playerSchema);
