const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
var path = require('path');

const corsOptions = require('./conf/corsOptions');
const credentials = require('./middleware/credentials');

const userRoutes = require('./routes/userRoutes.js');
const movieRoutes = require('./routes/movieRoutes.js');
const personRoutes = require('./routes/personRoutes.js');
const genreRoutes = require('./routes/genreRoutes.js');
const roleRoutes = require('./routes/roleRoutes.js');
const rateRoutes = require('./routes/rateRoutes');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

app.use(credentials);
app.use(cors(corsOptions));

// prevents the need for using file extensions
app.set('view engine', 'ejs');

// set views
app.set('views', path.join(__dirname, 'views'));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/person', personRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/rate', rateRoutes);
app.use('/', authRoutes); // both login and register

// errors
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).render('5xx');
});

// not found
app.use(function(req, res, next) {
    res.status(404).render('404', { url: req.originalUrl });
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

