const Concert = require('../models/concert.model');

exports.getAllConcerts = async (req, res) => {
    try {
        res.json(await Concert.find());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRandomConcert = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const conc = await Concert.findOne().skip(rand);
        if (!conc) res.status(404).json({ message: 'Not found' });
        else res.json(conc);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getConcertById = async (req, res) => {
    try {
        const conc = await Concert.findById(req.params.id);
        if (!conc) res.status(404).json({ message: 'Not found' });
        else res.json(conc);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.createConcert = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = { performer, genre, price, day, image };
        const conc = await Concert.create(newConcert);
        res.json(conc);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.updateConcert = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const id = +req.params.id;
        const concert = await Concert.findById(id);
        if (!concert) res.status(404).json({ message: 'Not found' });
        else {
            concert.performer = performer;
            concert.genre = genre;
            concert.price = price;
            concert.day = day;
            concert.image = image;
            await concert.save();
            res.json(concert);
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteConcert = async (req, res) => {
    try {
        const id = +req.params.id;
        const concert = await Concert.findById(id);
        if (!concert) res.status(404).json({ message: 'Not found' });
        else {
            await concert.remove();
            res.json({ message: 'Concert deleted' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
}