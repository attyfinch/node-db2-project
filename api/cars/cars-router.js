const router = require('express').Router();

const Cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(next)
});

router.get('/:id', checkCarId, (req, res, next) => {
    const { id } = req.params;

    Cars.getById(id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(next)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    // const { vin, make, model, mileage, title, transmission } = req.body;

    try {
        const newCar = await Cars.create({
            vin: req.body.vin,
            make: req.body.make, 
            model: req.body.model, 
            mileage: req.body.mileage,
            title: req.body.title, 
            transmission: req.body.transmission
        })

        res.status(201).json(newCar);

    } catch (err) {
        next(err);
    }
})

router.use((err, res, req, next) => {
    res.status(err.status || 500).json({
        err: err.message,
        customMessage: "Something is broken in cars-router"
    })
})

module.exports = router;