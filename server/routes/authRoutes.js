const express = require('express')

const registrationController = require('../controllers/registrationController');
const loginController = require('../controllers/loginController');
const logoutController = require('../controllers/logoutController');
const refreshTokenController = require('../controllers/refreshTokenController');

const router = express.Router()

function sendResponse(response, error, result){
    if(error) {
        response.status(error.status).send(error.userMessage);
        if(error.systemMessage) console.log(error.systemMessage);
        return;
    }
    if(result.cookies){
        for(let i = 0; i < result.cookies.length; ++i) {
            const cookie = result.cookies[i];
            response.cookie(cookie.name, cookie.value, cookie.options);
        }
    }
    if(result.clearCookies){
        for(let i = 0; i < result.clearCookies.length; ++i) {
            const cookie = result.clearCookies[i];
            response.clearCookie(cookie.name, cookie.options);
        }
    }
    response.status(result.status).send(result.data);
}

router.post('/login', (req, res) => {
    loginController.login(req.body, (cerr, cres) => {
        sendResponse(res, cerr, cres);
    })
});

router.get('/refreshtoken', (req, res) => {
    refreshTokenController.refreshToken(req.cookies, (cerr, cres) => {
        sendResponse(res, cerr, cres);
    })
});

router.get('/logout', (req, res) => {
    logoutController.logout(req.cookies, (cerr, cres) => {
        sendResponse(res, cerr, cres);
    })
});

router.post('/register', (req, res) => {
    registrationController.registerNewUser(req.body, (cerr, cres) => {
        sendResponse(res, cerr, cres);
    });
});

module.exports = router;