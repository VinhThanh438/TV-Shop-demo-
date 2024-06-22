const { statusCode, message } = require('../data/httpResponse');
const appError = require('../errors/appError');
require('dotenv').config();

module.exports = (app) => {
    app.all('*', (req, res, next) => {
        next(
            new appError(
                statusCode.NOT_FOUND,
                `can not found ${process.env.SERVER_DOMAIN}${req.originalUrl}`
            )
        );
    });
};
