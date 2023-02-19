const Joi = require('joi');

const newRateData = Joi.object({
    ocena: Joi.number().integer().min(0).max(10).required(),
    uzasadnienie: Joi.string(),
    film_id: Joi.number().integer().min(0).required()
});

module.exports = {
    newRateData,
}