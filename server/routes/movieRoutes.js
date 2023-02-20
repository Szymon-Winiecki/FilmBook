const express = require('express')

const router = express.Router()

const movieController = require('../controllers/movieController');
const authentication = require('../middleware/authenticateWithJWT');

router.get('/', movieController.getAllMovies);

router.get('/:id', movieController.getMovie);

router.post('/', authentication, movieController.addMovie);

router.put('/:id', authentication, movieController.updateMovie);

router.delete('/:id', authentication, movieController.deleteMovie);

module.exports = router;