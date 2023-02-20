const express = require('express')

const router = express.Router()

const rankController = require('../controllers/rankController');

router.get('/', (req, res) => {
    rankController.getAllRanks(req, res);
});

router.get('/:id', (req, res) => {
    rankController.getRank(req, res);
});

router.post('/', (req, res) => {
    rankController.addRank(req, res);
});

router.post('/update/:id', (req, res) => {
    rankController.updateRank(req, res);
});

router.post('/delete/:id', (req, res) => {
    rankController.deleteRank(req, res);
});

module.exports = router;