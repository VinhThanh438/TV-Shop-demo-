const express = require('express');
const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const helpers = require('handlebars-helpers');

const configViewEngine = (app) => {
    helpers.comparison({ handlebars: handlebars }); // Đăng ký các helper so sánh
    app.use(express.static('src/public'));
    app.engine('.hbs', engine({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', './src/views');
};

module.exports = configViewEngine;
