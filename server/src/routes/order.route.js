const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');
const verifyToken = require('../middleware/authorization');

const routes = (app) => {
    router.get('/', orderController.getAll);
    router.post('/add', orderController.addOrder);
    router.post('/orderInfor', orderController.getUserOrder);
    router.use(verifyToken);
    return app.use('/order', router);
};

module.exports = routes;
