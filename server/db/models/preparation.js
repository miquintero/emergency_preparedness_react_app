const mongoose = require('./index');
const Schema = mongoose.Schema;

const PrepSchema = new Schema({
  emergency: {
    type: String, 
    required: true
  }, 
  list: {
    type: Array, 
    required: true
  }
});

module.exports = mongoose.model('preparation', PrepSchema);