const express = require('express')

const router = express.Router()

const movieController = require('../controllers/movieController');

// router.get('/', movieController.moviesView);
// router.get('/movie/:id', movieController.movieView);
// router.get('/addmovie', movieController.addMovieView);

router.get('/', (req, res) => {
    movieController.getAllMovies(req, res);
});

router.get('/:id', (req, res) => {
    movieController.getMovie(req, res);
});

router.post('/', (req, res) => {
    movieController.addMovie(req, res);
});

router.put('/:id', (req, res) => {
    movieController.updateMovie(req, res);
});

router.delete('/:id', (req, res) => {
    movieController.deleteMovie(req, res);
});

module.exports = router;