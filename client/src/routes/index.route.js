const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const upload = require('../config/multer');
const productController = require('../controller/product.controller');
const userController = require('../controller/user.controller');
const orderController = require('../controller/order.controller');

const routes = (app) => {
    // admin
    router.get(
        '/admin',
        (req, res, next) => {
            const token = req.cookies.accessToken;
            if (token) data = jwt.decode(token);
            if (!req.cookies.accessToken) return res.render('404');
            if (data.role != 'admin') return res.render('404');
            next();
        },
        productController.adminGetAll
    );
    router.post('/admin/addproduct', upload.single('image'), productController.adminAddProduct);
    router.get('/product/delete/id=:id', productController.adminRemoveProduct);

    // product
    router.get('/', productController.getAll);
    router.get('/id=:id', productController.getProductById);
    router.post('/search', productController.searchProduct);

    // cart
    router.get('/cart', (req, res, next) => {
        return res.render('cartDetail');
    });

    // user
    router.get(
        '/user',
        (req, res, next) => {
            if (!req.cookies.accessToken) return res.render('404');
            next();
        },
        userController.userInfor
    );
    router.post('/user/login', userController.logIn);
    router.post(
        '/user/signup',
        (req, res, next) => {
            if (req.cookies.accessToken) return res.render('404');
            next();
        },
        userController.signUp
    );
    router.get(
        '/user/logout',
        (req, res, next) => {
            if (!req.cookies.accessToken) return res.render('404');
            next();
        },
        userController.logOut
    );
    router.get('/user/signup', (req, res, next) => {
        return res.render('signUp');
    });

    // google auth
    router.get('/auth/google/', userController.logInByGoogle);

    // order
    router.get('/order', orderController.getOrderPage);
    router.post('/order', orderController.addOrder);

    return app.use('', router);
};

module.exports = routes;
