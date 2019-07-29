const model = require('../model/index');
const Alert = require('../model/alerts');
const Preparation = require('../model/preparation');

exports.getAlert = async (req, res) => {
  try {
    // const userInput = req.params;
    // const alert = await Alert.findOne({city: 'Sacramento'}); 
    const alert = await Alert.find(); 
    res.status(200).send(alert);
  } catch (error) {
    console.log('error', error); //eslint-disable-line no-console
    res.status(500);
    res.send({error: error.errors})
  }
}

exports.seedAlerts = (req, res) => {
  const emergencyAlert = {
    "city" : "Sacramento",
    "title" : "Possibility wildfires will start and spread easily in Sacramento Valley",
    "type" : "Wildfire",
    "expires" : "4 days and 20 hours",
    "description" : "Two massive fires have started in San Joaquin County,\nCalifornia. Winds are blowing north with gusts up to 50mph. The\nupdated warning indicates the possibility that fires start\nin Sacramento County. Northern California’s Red Flag Warning\nwill last into Sunday.",
    "severity" : "warning"
  };  
  const newAlert = new Alert(emergencyAlert);
  newAlert.save();
  res.send('Database seeded!');
}

exports.getPreparations = async (req, res) => {
  try {
    // const userChoice = req.body;
    // const preparations = await Preparation.findOne({emergency: 'Flood'});
    const preparations = await Preparation.find();  
    res.status(200).send(preparations);
  } catch (error) {
    console.log('error', error); //eslint-disable-line no-console
    res.status(500);
    res.send({error: error.errors})
  }
}

exports.seedPreparations = (req, res) => {
  const emergencyPrep = {
    'emergency': 'Wildfire',
    'list': [
      'Plan two ways out of your neighborhood and designate a meeting place.',
      'Clear leaves and other debris from gutters, eaves, porches and decks. This prevents embers from igniting your home',      
      'Keep your lawn hydrated and maintained. If it is brown, cut it down to reduce fire intensity. Dry grass and shrubs are fuel for wildfire.',
      'Prune trees so the lowest branches are 6 to 10 feet from the ground.', 
      'Remove flammable materials (firewood stacks, propane tanks) within 30 feet of your home’s premises.'
    ]
  };
  const newPrep = new Preparation(emergencyPrep);
  newPrep.save();
  res.send('Database seeded for preparations lists!');
}