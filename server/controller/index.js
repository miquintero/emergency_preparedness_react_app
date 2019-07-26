const model = require('../model/index');
const Alert = require('../model/alerts');
const Preparation = require('../model/preparation');

exports.getAlert = async (req, res) => {
  try {
    const alert = await Alert.findOne({city: req.body}); //make sure req.body represents city
    res.status(200).send(alert);
  } catch (error) {
    console.log('error', error); //eslint-disable-line no-console
    res.status(500);
    res.send({error: error.errors})
  }
}

exports.seedAlerts = (req, res) => {
  const alerts = {
    'city': 'Atlanta',
    'zipcode': 30305,
    'title': 'Flood Watch for Buckhead, GA',
    'severity': 'warning',
    'time': 1509993360,
    'expires': 1510036680,
    'description': '...FLOOD WATCH REMAINS IN EFFECT THROUGH LATE WEDNESDAY NIGHT\n THE HEAVY RAIN WILL PUSH THE\nCHATTAHOOCHE RIVER ABOVE FLOOD STAGE TODAY...AND MAJOR FLOODING IS\nPOSSIBLE.\n*THE FLOODWATCH REMAINS IN EFFECT FOR GWINETT COUNTY FOR THE POSSIBILITY OF\nAREAL FLOODING ASSOCIATED WITH A MAJOR FLOOD.\n',
    'uri': 'http://alerts.weather.gov/cap/wwacapget.php?x=WA1255E4DB8494.FloodWatch.1255E4DCE35CWA.SEWFFASEW.38e78ec64613478bb70fc6ed9c87f6e6'
  };
  const newAlert = new Alert(alerts);
  newAlert.save();
  res.send('Database seeded!');
}

exports.getPreparations = async (req, res) => {
  try {
    const preparations = await Preparation.findOne({emergency: 'Flood'}); //make sure req.body represents emergency type  
    res.status(200).send(preparations);
  } catch (error) {
    console.log('error', error); //eslint-disable-line no-console
    res.status(500);
    res.send({error: error.errors})
  }
}

exports.seedPreparations = (req, res) => {
  const emergencyPreparations = {
    'emergency': 'Flood',  
    'list': [
      'Climb a tree',
      'Fill your tub with filtered water',
      'Prepare inflatable devices and canoe',
      'Elevate electrical components in living and working spaces', 
      'Waterproof your basement', 
      'Move furniture, valuables, and pets to a safe place'
    ]
  };
  const newPreparation = new Preparation(emergencyPreparations);
  newPreparation.save();
  res.send('Database seeded with preparation!');
}