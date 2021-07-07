const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/alerts_db', {useNewUrlParser: true});

mongoose.connection.on('open', () => {
  console.log(`Mongoose DB server is running!`)
})

module.exports = mongoose;