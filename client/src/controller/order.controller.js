const axios = require('../config/axios');
const appError = require('../error/appError');
const { cookieOption } = require('../config/token');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const orderController = {
    getOrderPage: async (req, res, next) => {
        const token = req.cookies.accessToken;
        let data;
        const codeInfor = await axios.get(`${process.env.SERVER_DOMAIN}/user/givecode`);
        if (token) {
            data = jwt.decode(token);
            data.expcode = codeInfor.data;
        }
        return res.render('order', data);
    },

    addOrder: async (req, res, next) => {
        await axios.post(`${process.env.SERVER_DOMAIN}/order/add`, req.body);
        console.log(req.body);

        // Thay đổi give code sau khi thực hiện thanh toán đầu.
        if (req.body.Iduser) {
            await axios.post(`${process.env.SERVER_DOMAIN}/user/changegivecode`, {
                iduser: req.body.Iduser,
            });
        }

        // delay 1.5s for bug
        await delay(1500);
        return res.render('orderSuccess');
    },
};

module.exports = orderController;
