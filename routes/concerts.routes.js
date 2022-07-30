const express = require('express');
const router = express.Router();
const ConcertControlller = require('../controllers/concerts.controller');

router.get('/concerts', ConcertControlller.getAllConcerts);
router.get('/concerts/random', ConcertControlller.getRandomConcert);
router.get('/concerts/:id', ConcertControlller.getConcertById);
router.get('/concerts/performer/:performer', ConcertControlller.getConcertByPerformer);
router.get('/concerts/genre/:genre', ConcertControlller.getConcertByGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertControlller.getConcertByPrice);
router.get('/concerts/day/:day', ConcertControlller.getConcertByDay);
router.post('/concerts', ConcertControlller.createConcert);
router.put('/concerts/:id', ConcertControlller.updateConcert);
router.delete('/concerts/:id', ConcertControlller.deleteConcert);

module.exports = router;
