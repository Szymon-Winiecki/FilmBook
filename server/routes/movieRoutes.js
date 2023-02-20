const express = require('express')

const router = express.Router()

const movieController = require('../controllers/movieController');
const authentication = require('../middleware/authenticateWithJWT');
const authorization = require('../middleware/authorize');

router.get('/', movieController.getAllMovies);

router.get('/:id', movieController.getMovie);

router.post('/', authentication, authorization('add_movie'), movieController.addMovie);

router.put('/:id', authentication, authorization('alter_movie'), movieController.updateMovie);

router.delete('/:id', authentication, authorization('delete_movie'), movieController.deleteMovie);

module.exports = router;