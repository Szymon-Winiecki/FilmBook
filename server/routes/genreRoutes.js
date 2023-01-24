const express = require('express')

const router = express.Router()

const genreController = require('../controllers/genreController');

router.get('/', (req, res) => {
    genreController.getAllGenres(req, res);
});

router.get('/:id', (req, res) => {
    genreController.getGenre(req, res);
});

router.post('/', (req, res) => {
    genreController.addGenre(req, res);
});

router.put('/:id', (req, res) => {
    genreController.updateGenre(req, res);
});

router.delete('/:id', (req, res) => {
    genreController.deleteGenre(req, res);
});

module.exports = router;