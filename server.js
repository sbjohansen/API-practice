const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimontials', (req, res) => {
    res.json(db);
});

app.get('/testimontials/random', (req, res) => {
    res.json(db.find((req) => req.id === Math.floor(Math.random() * db.length) + 1));
});

app.get('/testimontials/:id', (req, res) => {
    res.json(db.find((testimontial) => testimontial.id === +req.params.id));
    console.log('with +', req.params.id);
    console.log('', req.params.id);
});

app.post('/testimontials', (req, res) => {
    const { author, text } = req.body;
    const id = uuid();
    const newTestimonial = { id: id, author, text };
    db.push(newTestimonial);
    res.json({ message: 'ok!' });
});

app.put(
    '/testimontials/:id',
    (req, res) => {
        const { author, text } = req.body;
        const id = +req.params.id;
        const testimontial = db.find((testimontial) => testimontial.id === id);
        testimontial.author = author;
        testimontial.text = text;
        res.json({ message: 'ok!' });    },
    (err) => {
        console.log(err);
    }
);

app.delete(
    '/testimontials/:id',
    (req, res) => {
        const id = +req.params.id;
        db.splice(
            db.findIndex((testimontial) => testimontial.id === id),
            1
        );
        res.json({ message: 'Testimontial deleted' });
    },
    (err) => {
        console.log(err);
    }
);

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
