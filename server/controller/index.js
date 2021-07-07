const model = require('../db/models/index');
const Alert = require('../db/models/alerts');
const Preparation = require('../db/models/preparation');

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
      "city" : "madrid",
      "title" : "Zombie Apocalypse quickly approaching Madrid",
      "type" : "apocalypse",
      "expires" : "No known expiration date",
      "description" : "Residents of the suburbs of Madrid have begun to encounter signs of zombies inhabiting",
      "severity" : "alert"
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
      'emergency': 'apocalypse',
      'list': [
        'Gather sufficient supplies to survive for 90 days',
        'Obtain and stockpile basic survival (the most important) items. ',
        'Set up a communication system. Communicate secret locations with your family members and friends using a radio.', 
        'Use diesel-powered vehicles. Hoarding gasoline will not work; the chemicals that once kept it fresh will degrade it in time.'
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