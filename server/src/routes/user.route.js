const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/authentication');
const verifyToken = require('../middleware/authorization');
const deleteUserCart = require('../middleware/deleteUserCart');

const routes = (app) => {
    router.post('/add', auth.signUp, userController.createUser);
    router.post('/login', userController.logIn);
    router.post('/delete', verifyToken, deleteUserCart, userController.deleteUser);
    router.post('/update', verifyToken, userController.editUser);
    router.post('/logOut', verifyToken, userController.logOut);
    router.get('/givecode', userController.selectGiveCode);
    router.post('/changegivecode', userController.changeGiveCode);
    return app.use('/user', router);
};

module.exports = routes;
