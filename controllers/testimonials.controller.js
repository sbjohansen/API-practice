const Testimonial = require('../models/testimonial.model');

exports.getAllTestimonials = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRandomTestimonial = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const testimonial = await Testimonial.findOne().skip(rand);
        if (!testimonial) res.status(404).json({ message: 'Not found' });
        else res.json(testimonial);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) res.status(404).json({ message: 'Not found' });
        else res.json(testimonial);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = await Testimonial.create({ author, text });
        res.json(newTestimonial);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.updateTestimonial = async (req, res) => {
    try {
        const { author, text } = req.body;
        const id = +req.params.id;
        const updateTestimonial = await Testimonial.findById(id);
        if (!updateTestimonial) res.status(404).json({ message: 'Not found' });
        else {
            testimonial.author = author;
            testimonial.text = text;
            await testimonial.save();
            res.json(testimonial);
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const id = +req.params.id;
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) res.status(404).json({ message: 'Not found' });
        else {
            await testimonial.remove();
            res.json({ message: 'Deleted' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
