const mongoose = require('./index');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
  city: {
    type: String, 
    required: true
  }, 
  title: {
    type: String, 
    required: true
  }, 
  type: {
    type: String,
    required: true
  },
  expires: {
    type: String, 
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  severity: {
    type: String,
    required: true
  } 
});

module.exports = mongoose.model('alert', AlertSchema);