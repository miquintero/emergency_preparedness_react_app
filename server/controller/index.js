const model = require('../model/index');
const Alert = require('../model/alerts');
const Preparation = require('../model/preparation');

exports.getAlert = async (req, res) => {
  try {
    console.log('city name', req.params.city);
    const alert = await Alert.findOne({city: req.params.city}); 
    res.status(200).send(alert);
  } catch (error) {
    console.log('error', error); //eslint-disable-line no-console
    res.status(500);
    res.send({error: error.errors})
  }
}

exports.seedAlerts = (req, res) => {
  try {
    const emergencyAlert =   {
      "city" : "santiago",
      "title" : "6.3- magnitude Earthquake hit Santiago, Chile",
      "type" : "earthquake",
      "expires" : "26 hours",
      "description" : "Early Wednesday morning an earthquake impacted Santiago.\nThe epicenter was 15 kilometers southwest of the center of the\ncity in Mapiu. Aftershocks and tremors may be felt up to\n36kms away from Santiago.",
      "severity" : "warning"
    };  
    const newAlert = new Alert(emergencyAlert);
    newAlert.save();
    res.status(201);
    res.send('Database seeded!');
  } catch (error) {
    console.log('error', error); //eslint-disable-line no-console
    res.status(500);
    res.send({error: error.errors})
  }
}

exports.getPreparations = async (req, res) => {
  try {
    console.log('emergency type', req.params.type);
    const preparations = await Preparation.findOne({emergency: req.params.type}); 
    console.log(preparations);
    res.status(200).send(preparations);
  } catch (error) {
    console.log('error', error); //eslint-disable-line no-console
    res.status(500);
    res.send({error: error.errors})
  }
}

exports.seedPreparations = (req, res) => {
  try {
    const emergencyPrep =   {
      'emergency': 'tsunami',
      'list': [
        'Avoid building or living in buildings within several hundred feet of the coastline.',
        'Plan an evacuation route from your home, school, workplace, or any other place you will be where tsunamis present a risk', 
        'Make a list of items to bring inside in the event of a tsunami.', 
        'Elevate coastal homes.',
        'Be careful to avoid downed power lines and stay away from buildings and bridges from which heavy objects might fall during an aftershock.',
        'Follow flood and earthquake preparedness precautions.'
      ]
    };
    const newPrep = new Preparation(emergencyPrep);
    newPrep.save();
    res.send('Database seeded for preparations lists!');
  } catch (error) {
    console.log('error', error); //eslint-disable-line no-console
    res.status(500);
    res.send({error: error.errors})
  }
}