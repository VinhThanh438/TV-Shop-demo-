const axios = require('../config/axios');
const appError = require('../error/appError');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();

const productController = {
    getAll: async (req, res, next) => {
        try {
            const getData = await axios.get(`${process.env.SERVER_DOMAIN}/products`, {
                withCredentials: true,
            });
            return res.render('home', { data: getData.data });
        } catch (err) {
            next(new appError(err));
        }
    },

    getProductById: async (req, res, next) => {
        try {
            const idproduct = req.params.id;
            const getData = await axios.get(`${process.env.SERVER_DOMAIN}/products/${idproduct}`);
            return res.render('productDetail', { data: getData.data });
        } catch (err) {
            next(new appError(err));
        }
    },

    searchProduct: async (req, res, next) => {
        try {
            const getData = await axios.post(`${process.env.SERVER_DOMAIN}/products/search`, {
                keyword: req.body.keyword,
            });
            return res.render('home', { data: getData.data });
        } catch (err) {
            next(new appError(err));
        }
    },

    adminGetAll: async (req, res, next) => {
        try {
            const getData = await axios.get(`${process.env.SERVER_DOMAIN}/products`);
            return res.render('admin/product', { layout: 'admin', data: getData.data });
        } catch (err) {
            next(new appError(err));
        }
    },

    adminAddProduct: async (req, res, next) => {
        try {
            const data = new FormData();
            data.append('nameproduct', req.body.nameproduct);
            data.append('priceproduct', req.body.priceproduct.replace(/\./g, ''));
            data.append('condproduct', req.body.condproduct);
            data.append('image', fs.createReadStream(req.file.path));

            await axios.post(`${process.env.SERVER_DOMAIN}/products/add`, data, {
                headers: data.getHeaders(),
            });

            const filePath = path.join(
                __dirname,
                `../../${req.file.destination}`,
                req.file.filename
            );

            fs.unlink(filePath, (err) => {
                if (err) console.error('Đã xảy ra lỗi khi xóa tệp tin:', err);
            });

            return res.redirect('/admin');
        } catch (err) {
            next(new appError(err));
        }
    },

    adminRemoveProduct: async (req, res, next) => {
        try {
            const idproduct = req.params.id;
            await axios.post(`${process.env.SERVER_DOMAIN}/products/delete/${idproduct}`);
            return res.redirect('/admin');
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = productController;
