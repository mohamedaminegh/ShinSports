const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
var options = { discriminatorKey: 'entity' };

var entitySchema = new mongoose.Schema(
  {
  },
  options);
module.exports = mongoose.model('entities', entitySchema);