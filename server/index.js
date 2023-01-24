const express = require('express');
const cookieParser = require('cookie-parser');

const usersRoutes = require('./routes/usersRoutes.js')
const movieRoutes = require('./routes/movieRoutes.js')
const personRoutes = require('./routes/personRoutes.js')
const genreRoutes = require('./routes/genreRoutes.js')
const roleRoutes = require('./routes/roleRoutes.js')

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/person', personRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/role', roleRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to FilmBook!')
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

