const express = require('express');
const SeatController = require('../controllers/seats.controller');
const router = express.Router();

router.get('/seats', SeatController.getAllSeats);
router.get('/seats/random', SeatController.getRandomSeat);
router.get('/seats/:id', SeatController.getSeatById);
router.post('/seats', SeatController.createSeat);
router.put('/seats/:id', SeatController.updateSeat);
router.delete('/seats/:id', SeatController.deleteSeat);

module.exports = router;