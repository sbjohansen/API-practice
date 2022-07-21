const express = require('express');
const router = express.Router();
const ConcertControlller = require('../controllers/concerts.controller');

router.get('/concerts', ConcertControlller.getAllConcerts);
router.get('/concerts/random', ConcertControlller.getRandomConcert);
router.get('/concerts/:id', ConcertControlller.getConcertById);
router.post('/concerts', ConcertControlller.createConcert);
router.put('/concerts/:id', ConcertControlller.updateConcert);
router.delete('/concerts/:id', ConcertControlller.deleteConcert);

module.exports = router;
