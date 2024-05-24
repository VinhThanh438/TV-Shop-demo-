const { uploadCloudProduct } = require('../config/cloudinary.config');
const productControler = require('../controller/productController');
const express = require('express');
const router = express.Router();

const routes = (app) => {
    router.get('/', productControler.getAllProducts);
    router.get('/:id', productControler.getProductById);
    router.post('/add', uploadCloudProduct.single('image'), productControler.addProduct);
    router.post('/edit/:id', uploadCloudProduct.single('image'), productControler.editProduct);
    router.post('/delete/:id', productControler.removeProduct);
    router.post('/search', productControler.searchProduct);
    return app.use('/products', router);
};

module.exports = routes;
