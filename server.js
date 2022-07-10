const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;
const db = require('./db.js');

const app = express();

//import routes
const testimonialRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/', testimonialRoutes);
app.use('/api/', concertsRoutes);


app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
