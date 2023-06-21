const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

module.exports = { 
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}

function checkCarId(req, res, next) {
  Cars.getById(req.params.id)
    .then(car => {
      if (!car) {
        res.status(404).json({message: "That ID does not exist"})
      }
    })
    next();
}

function checkCarPayload (req, res, next) {
  const { vin, make, model, mileage } = req.body;



  if (model === null || !model || model.length === 0) {
    res.status(400).json({message: "model is missing"})
  } else if (make === null || !make || make.length === 0) {
    res.status(400).json({message: "make is missing"})
  } else if (vin === null || !vin || vin.length === 0) {
    res.status(400).json({message: "vin is missing"})
  } else if (mileage === null || !mileage || mileage.length === 0) {
    res.status(400).json({message: "mileage is missing"})
  } else {
    next();
  }
}

function checkVinNumberValid (req, res, next) {
  const isValidVin = vinValidator.validate(req.body.vin)
  
  if (isValidVin === false) {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  } else {
    next();
  }
  
}

function checkVinNumberUnique (req, res, next) {
  
  Cars.getAll()
    .then(cars => {
      cars.forEach(ele => {
        if (ele.vin === req.body.vin) {
          res.status(400).json({message: `vin ${req.body.vin} already exists`})
        }
      })})
    .catch(next)
  next();
}