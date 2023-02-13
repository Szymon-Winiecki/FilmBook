const database = require('../dbconn/dbPool');

function authorize(permission){
    return (req, res, next) => {
        const query = `select authorize(${req.user.id}, '${permission}');`
        database.query(query, (qerr, qres) => {
            if(qerr){
                console.error(qerr);
                console.error(query);
                return res.sendStatus(500);
            }
            if(qres.rows[0]?.authorize){
                next();
            }
            else{
                res.sendStatus(403);
            }
        });
    }
}

module.exports = authorize;