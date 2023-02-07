const express = require('express')

const router = express.Router()

const authentication = require('../middleware/authenticateWithJWT.js');

const genreController = require('../controllers/genreController');

router.get('/', (req, res) => {
    genreController.getAllGenres(req, res);
});

router.get('/:id', (req, res) => {
    genreController.getGenre(req, res);
});

router.post('/', authentication, (req, res) => {
    genreController.addGenre(req, res);
});

router.put('/:id', authentication, (req, res) => {
    genreController.updateGenre(req, res);
});

router.delete('/:id', authentication, (req, res) => {
    genreController.deleteGenre(req, res);
});

module.exports = router;