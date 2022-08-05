const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');

exports.getAllSeats = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRandomSeat = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(rand);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getSeatById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = sanitize(req.body);
    const seatCheck = await Seat.exists({ day, seat });
    if (seatCheck) {
      res.status(400).json({ message: 'Seat already taken' });
    } else {
      const newSeat = await Seat.create({ day, seat, client, email });
      res.json(newSeat);
      const allSeats = await Seat.find();
      req.io.emit('seatsUpdated', allSeats);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const id = +req.params.id;
    const updateSeat = await Seat.findById(id);
    if (!updateSeat) res.status(404).json({ message: 'Not found' });
    else {
      seat.day = day;
      seat.seat = seat;
      seat.client = client;
      seat.email = email;
      await seat.save();
      res.json(seat);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const id = +req.params.id;
    const seat = await Seat.findById(id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else {
      await seat.remove();
      res.json({ message: 'Deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
