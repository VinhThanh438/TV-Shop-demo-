const axios = require('../config/axios');
const appError = require('../error/appError');
const { cookieOption } = require('../config/token');
const jwt = require('jsonwebtoken');
const http = require('http');
const productController = require('./product.controller');
require('dotenv').config();

const generateCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
};

const userController = {
    logIn: async (req, res, next) => {
        try {
            const { email, password, verified } = req.body;

            const getData = await axios.post(`${process.env.SERVER_DOMAIN}/user/login`, {
                email: email,
                password: password,
                verified: verified,
            });

            const accessToken = getData.data.accessToken;
            const refreshToken = getData.data.refreshToken;

            res.cookie('accessToken', accessToken, cookieOption);
            res.cookie('refreshToken', refreshToken, cookieOption);

            const prvPage = req.headers.referer;
            if (prvPage) return res.redirect(prvPage);
            return res.redirect(`${process.env.CLIENT_DOMAIN}`);
        } catch (err) {
            if (err.response.status === 401) return res.redirect(req.headers.referer);
            next(new appError(err));
        }
    },

    logInByGoogle: async (req, res, next) => {
        try {
            http.get(`${process.env.SERVER_DOMAIN}/auth/google/callback`, (externalRes) =>
                res.redirect(externalRes.rawHeaders[9])
            );
        } catch (err) {
            next(new appError(err));
        }
    },

    signUp: async (req, res, next) => {
        try {
            const { username, email, sdt, password } = req.body;
            const getData = await axios.post(`${process.env.SERVER_DOMAIN}/user/add`, {
                nameuser: username,
                email: email,
                password: password,
                sdt: sdt,
                givecode: generateCode(7),
            });
            const accessToken = getData.data.newAccessToken;
            const refreshToken = getData.data.newRefreshToken;
            res.cookie('accessToken', accessToken, cookieOption);
            res.cookie('refreshToken', refreshToken, cookieOption);
            return res.redirect('/');
        } catch (err) {
            next(new appError(err));
        }
    },

    logOut: (req, res, next) => {
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        const prvPage = req.headers.referer;
        if (prvPage) {
            if (prvPage == `${process.env.CLIENT_DOMAIN}/user`) return res.redirect('/');
            return res.redirect(prvPage);
        }
        return res.redirect('/');
    },

    userInfor: async (req, res, next) => {
        let data;
        const token = req.cookies.accessToken;
        if (token) data = jwt.decode(token);

        const orderInfor = await axios.post(`${process.env.SERVER_DOMAIN}/order/orderInfor`, {
            iduser: data.iduser,
        });
        if (data.role == 'admin') return productController.adminGetAll(req, res, next);
        if (orderInfor.data.length === 0) return res.render('user', { data, orderInfor: '' });

        return res.render('user', { data, orderInfor: orderInfor.data });
    },
};

module.exports = userController;
