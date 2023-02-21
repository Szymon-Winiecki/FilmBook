const express = require('express')

const router = express.Router()

const authentication = require('../middleware/authenticateWithJWT');
const authorization = require('../middleware/authorize');

const genreController = require('../controllers/genreController');

router.get('/movie/:id', genreController.getGenresOfMovie);

router.get('/', (req, res) => {
    genreController.getAllGenres(req, res);
});

router.get('/:id', (req, res) => {
    genreController.getGenre(req, res);
});

router.post('/', authentication, authorization('add_genre'), (req, res) => {
    genreController.addGenre(req, res);
});

router.put('/:id', authentication, authorization('alter_genre'), (req, res) => {
    genreController.updateGenre(req, res);
});

router.delete('/:id', authentication, authorization('delete_genre'), (req, res) => {
    genreController.deleteGenre(req, res);
});

module.exports = router;