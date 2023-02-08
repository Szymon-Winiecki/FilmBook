const originsWhitelist = require('../conf/originsWhitelist');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (originsWhitelist.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;