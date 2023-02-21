const database = require('../dbconn/dbPool');

const genreController = require('../controllers/genreController');

const moviesView = (req, res) => {
    res.render("movies", {
        genres: genreController.getAllGenres()
    } );
}

const movieView = (req, res) => {
    res.render("movie", {
    } );
}

const addMovieView = (req, res) => {
    res.render("addMovie", {
    } );
}

function getAllMovies(req, res){
    let whereClause = '';
    let sortClause = '';

    if(req.query.genre){
        whereClause = `where gatunek.nazwa='${req.query.genre}'`;
    }

    if(req.query.sortBy){
        sortClause = `order by film.${req.query.sortBy} `;
        if(req.query.sortDir){
            sortClause += req.query.sortDir;
        }
    }

    const query = `select film.* from film ${req.query.genre ? 'join gatunki_filmow on film.id = gatunki_filmow.film_id join gatunek on gatunki_filmow.gatunek_id = gatunek.id' : ''} ${whereClause} ${sortClause};`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function getMovie(req, res){
    const query = `select * from film where id=${req.params.id};`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function addMovie(req, res){
    let data_swiatowej_premiery = req.body.data_swiatowej_premiery.length == 0 ? 'null' : `'${req.body.data_swiatowej_premiery}'`;
    let data_polskiej_premiery = req.body.data_polskiej_premiery.length == 0 ? 'null' : `'${req.body.data_polskiej_premiery}'`;

    const query =   `insert into film(tytul_polski, tytul_orginalny, data_swiatowej_premiery, data_polskiej_premiery, czas_trwania, opis, czlowiek_kina_id) 
                    values('${req.body.tytul_polski}', '${req.body.tytul_orginalny}', ${data_swiatowej_premiery}, ${data_polskiej_premiery}, ${req.body.czas_trwania}, '${req.body.opis}', ${req.body.czlowiek_kina_id}) returning *`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }

        if(req.body.gatunki?.length > 0){
            let genresRows = '';
            req.body.gatunki.forEach((genreId, i) => {
                if(i == 0){
                    genresRows += `(${qres.rows[0].id}, ${genreId})`;
                }
                else{
                    genresRows += `,(${qres.rows[0].id}, ${genreId})`
                }
                
            });
            const genresQuery = `insert into gatunki_filmow(film_id, gatunek_id) values ${genresRows};`;
            database.query(genresQuery, (gqerr, gqres) => {
                if(gqerr){
                    console.error(gqerr);
                    console.error(genresQuery);
                    return res.sendStatus(500);
                }
            })
        }
        res.status(200).json(qres.rows);
    })
}

function updateMovie(req, res){
    const query =   `update film set 
                    tytul_polski='${req.body.tytul_polski}', tytul_orginalny='${req.body.tytul_orginalny}', data_swiatowej_premiery='${req.body.data_swiatowej_premiery}', data_polskiej_premiery='${req.body.data_polskiej_premiery}', czas_trwania=${req.body.czas_trwania}, opis='${req.body.opis}', czlowiek_kina_id=${req.body.czlowiek_kina_id}
                    where id=${req.params.id} returning *;`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }

        deleteGenresQuery = `delete from gatunki_filmow where film_id=${qres.rows[0].id};`;
        database.query(deleteGenresQuery, (derr, dres) => {
            if(derr){
                console.error(qerr);
                console.error(query);
                return res.sendStatus(500);
            }

            if(req.body.gatunki?.length > 0){
                let genresRows = '';
                req.body.gatunki.forEach((genreId, i) => {
                    if(i == 0){
                        genresRows += `(${qres.rows[0].id}, ${genreId})`;
                    }
                    else{
                        genresRows += `,(${qres.rows[0].id}, ${genreId})`
                    }
                    
                });
                const genresQuery = `insert into gatunki_filmow(film_id, gatunek_id) values ${genresRows};`;
                database.query(genresQuery, (gqerr, gqres) => {
                    if(gqerr){
                        console.error(gqerr);
                        console.error(genresQuery);
                        return res.sendStatus(500);
                    }
                })
            }

        });

        res.status(200).json(qres.rows);
    })
}

function deleteMovie(req, res){
    const query = `delete from film where id=${req.params.id} returning *;`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

module.exports = {
    moviesView,
    movieView,
    addMovieView,
    getAllMovies,
    getMovie,
    addMovie,
    updateMovie,
    deleteMovie
}