const database = require('../dbconn/dbPool');

function getAllRoles(req, res){
    let whereClause = "";
    if(req.query.movie){
        whereClause += ` where film_id=${req.query.movie}`;
    }
    const query = `select * from rola${whereClause};`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function getRole(req, res){
    const query = `select * from rola where id=${req.params.id};`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function addRole(req, res){
    const query =   `insert into rola(bohater, opis, czlowiek_kina_id, film_id, serial_id) 
                    values('${req.body.bohater}', '${req.body.opis}', ${req.body.czlowiek_kina_id}, ${req.body.film_id}, ${req.body.serial_id}) returning *`;
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function updateRole(req, res){
    const query =   `update rola set 
                    bohater='${req.body.bohater}',
                    opis='${req.body.opis}',
                    czlowiek_kina_id=${req.body.czlowiek_kina_id},
                    film_id=${req.body.film_id},
                    serial_id=${req.body.serial_id}
                    where id=${req.params.id} returning *;`
    database.query(query, (qerr, qres) => {
        if(qerr){
            console.error(qerr);
            console.error(query);
            return res.sendStatus(500);
        }
        res.status(200).json(qres.rows);
    })
}

function deleteRole(req, res){
    const query = `delete from rola where id=${req.params.id} returning *;`
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
    getAllRoles,
    getRole,
    addRole,
    updateRole,
    deleteRole
}