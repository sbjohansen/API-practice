const express = require('express');
const uuidv4 = require('uuid');
const db = require('../db.js');

const router = express.Router();

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * (db.testimonials.length))]);
    console.log(Math.floor(Math.random() * db.testimonials.length));
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.find((testimonial) => testimonial.id === +req.params.id));
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const id = uuid();
    const newTestimonial = { id: id, author, text };
    db.testimonial.push(newTestimonial);
    res.json({ message: 'ok!' });
});

router.route('/testimonials/:id').put(
    (req, res) => {
        const { author, text } = req.body;
        const id = +req.params.id;
        const testimonial = db.testimonial.find((testimonial) => testimonial.id === id);
        testimonial.author = author;
        testimonial.text = text;
        res.json({ message: 'ok!' });
    },
    (err) => {
        console.log(err);
    }
);

router.route('/testimonials/:id').delete(
    (req, res) => {
        const id = +req.params.id;
        db.testimonial.splice(
            db.testimonial.findIndex((testimonial) => testimonial.id === id),
            1
        );
        res.json({ message: 'Testimonial deleted' });
    },
    (err) => {
        console.log(err);
    }
);

module.exports = router;