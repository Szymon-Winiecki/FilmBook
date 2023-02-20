const express = require('express')

const router = express.Router()

const authentication = require('../middleware/authenticateWithJWT');
const authorization = require('../middleware/authorize');

const rankController = require('../controllers/rankController');

router.get('/', authentication, authorization('get_ranks'), (req, res) => {
    rankController.getAllRanks(req, res);
});

router.get('/:id', authentication, authorization('get_rank'), (req, res) => {
    rankController.getRank(req, res);
});

router.post('/', authentication, authorization('add_rank'), (req, res) => {
    rankController.addRank(req, res);
});

router.put('/:id', authentication, authorization('alter_rank'), (req, res) => {
    rankController.updateRank(req, res);
});

router.delete('/:id', authentication, authorization('delete_rank'), (req, res) => {
    rankController.deleteRank(req, res);
});

module.exports = router;