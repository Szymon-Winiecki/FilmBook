const express = require('express');
const cookieParser = require('cookie-parser');

const usersRoutes = require('./routes/usersRoutes.js')

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to FilmBook!')
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

