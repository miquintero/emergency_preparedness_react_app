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
  expires: {
    type: Number, 
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  uri: String, 
});

module.exports = mongoose.model('alert', AlertSchema);