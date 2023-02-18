const Joi = require('joi');

const newUserData = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email({ tlds: { allow: false }, minDomainSegments: 1 }).required(),
    password: Joi.string().min(6).required()
});

const loginData = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().required()
});

const changePasswordData = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
});

module.exports = {
    newUserData,
    loginData,
    changePasswordData
}