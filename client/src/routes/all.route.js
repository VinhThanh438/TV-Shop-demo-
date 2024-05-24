const appError = require('../error/appError');
require('dotenv').config();

module.exports = (app) => {
    app.all('*', (req, res, next) => {
        return res.render('404');
    });
};
