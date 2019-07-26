const model = require('../model/index');
const Alert = require('../model/alerts');
const Preparation = require('../model/preparation');

exports.getAlert = async (req, res) => {
  try {
    const alert = await Alert.findOne({city: req.body}); 
    res.status(200).send(alert);
  } catch (error) {
    console.log('error', error); //eslint-disable-line no-console
    res.status(500);
    res.send({error: error.errors})
  }
}

exports.getPreparations = async (req, res) => {
  try {
    const preparations = await Preparation.findOne({emergency: 'Flood'});  
    res.status(200).send(preparations);
  } catch (error) {
    console.log('error', error); //eslint-disable-line no-console
    res.status(500);
    res.send({error: error.errors})
  }
}