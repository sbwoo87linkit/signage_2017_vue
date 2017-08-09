var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new mongoose.Schema({
  groupId: Schema.Types.ObjectId,
  type: String,
  from: Object,
  to: Object,
  rows: [],
  config: Object,
  description: String,
  createAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('Schedule', scheduleSchema);
