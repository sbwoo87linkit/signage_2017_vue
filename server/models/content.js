var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = new mongoose.Schema({
  groupId: Schema.Types.ObjectId,
  fileName: String,
  originalName: String,
  mimeType: String,
  uploadBy: String,
  description: String,
  createAt: {type: Date, default: Date.now},
  size: Number
});

module.exports = mongoose.model('Content', contentSchema);
