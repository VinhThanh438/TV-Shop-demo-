const pool = require('../config/connectDB');
const { statusCode } = require('../data/httpResponse');
const appError = require('../errors/appError');
const jwt = require('jsonwebtoken');
let query;
require('dotenv').config();

module.exports = {
    signUp: async (req, res, next) => {
        query = 'select * from user where email = ?';
        const { email, nameuser } = req.body;
        console.log(email);
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        // check cookie
        const token = accessToken ? accessToken : refreshToken;
        if (token) res.clearCookie('accessToken', 'refreshToken');

        const [checkUser] = await pool.execute(query, [email]);
        if (checkUser.length !== 0)
            next(new appError(statusCode.BAD_REQUEST, 'this account has already existed'));
        next();
    },
};
