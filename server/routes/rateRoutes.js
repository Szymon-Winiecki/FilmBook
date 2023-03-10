const express = require('express')

const router = express.Router()

const authentication = require('../middleware/authenticateWithJWT');
const authorization = require('../middleware/authorize');

const rateController = require('../controllers/rateController');

router.get('/movie/:id/my', authentication, rateController.getOwnRateOfMovie);

router.delete('/movie/:id/my', authentication, rateController.deleteOwnRateOfMovie);

router.get('/movie/:id', rateController.getAllRatesForMovie);

router.get('/user/:id', rateController.getAllRatesOfUser);

router.get('/:id', rateController.getRate);

router.post('/', authentication, rateController.addRate);

router.put('/', authentication, rateController.updateRate);

router.delete('/:id', authentication, authorization('delete_rate'), rateController.deleteRate);

module.exports = router;