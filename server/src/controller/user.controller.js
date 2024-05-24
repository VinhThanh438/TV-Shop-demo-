const pool = require('../config/connectDB');
const idData = require('../data/idData.js');
const bcrypt = require('bcrypt');
const { statusCode, message } = require('../data/httpResponse');
const appError = require('../errors/appError');
const { token, cookieOption } = require('../config/token');
require('dotenv').config();
let query;

const userController = {
    createUser: async (req, res, next) => {
        try {
            query =
                'insert into user (iduser, nameuser, password, role, email, avatar, sdt) values (?, ?, ?, ?, ?, ?, ?)';
            const { nameuser, password, email, sdt, givecode } = req.body;

            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            // create and check user id
            let createId = () => Math.floor(Math.random() * 9999) + 1000;
            let iduser = createId();
            idData().user.map((id) => {
                if (id == createId()) iduser = createId();
            });

            idData('add', 'user', iduser);

            await pool.execute(query, [iduser, nameuser, hashed, 'user', email, '', sdt]);

            // Add give code
            query = 'insert into promote (iduser, givecode, state) values (?, ?, ?)';
            await pool.execute(query, [iduser, givecode, 'con']);

            const user = {
                nameuser: nameuser,
                iduser: iduser,
                email: email,
                code: givecode,
                state: 'con',
                sdt: sdt,
            };

            // create token and add to cookie
            const newAccessToken = token.accessToken(user);
            const newRefreshToken = token.refreshToken(user);

            res.cookie('accessToken', newAccessToken, cookieOption);
            res.cookie('refreshToken', newRefreshToken, cookieOption);

            return res.status(statusCode.CREATED).json({
                message: 'user was successfully added!',
                newAccessToken,
                newRefreshToken,
            });
        } catch (err) {
            next(new appError(err));
        }
    },

    logIn: async (req, res, next) => {
        try {
            query =
                'select iduser, email, role, password, avatar, sdt, nameuser from user where email = ?';
            const { email, password, verified } = req.body;

            // query user data
            const [data] = await pool.execute(query, [email]);
            if (data.length === 0) {
                return res.status(statusCode.UNAUTHORIZED).json({ message: 'user not found' });
            }

            // select give code
            query = 'select givecode, state from promote where iduser = ?';
            const [giveCode] = await pool.execute(query, [data[0].iduser]);
            data[0].code = giveCode[0].givecode;
            data[0].state = giveCode[0].state;

            // compare password
            if (!verified) {
                bcrypt.compare(password, data[0].password, (err, result) => {
                    if (err) return next(new appError(statusCode.BAD_REQUEST, err));
                    if (!result)
                        return next(new appError(statusCode.FORBIDDEN, 'incorect password'));
                });
            }

            // create token and add to cookie
            const accessToken = token.accessToken(data[0]);
            const refreshToken = token.refreshToken(data[0]);

            // create cookie
            res.cookie('accessToken', accessToken, cookieOption);
            res.cookie('refreshToken', refreshToken, cookieOption);

            // if (verified) return { accessToken, refreshToken };

            return res
                .status(statusCode.OK)
                .json({ message: 'loggin successfully', accessToken, refreshToken });
        } catch (err) {
            next(new appError(err));
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const email = req.user.email;

            query = 'delete from user where email = ?';
            await pool.execute(query, [email]);

            // delete id user from server storage
            idData('delete', 'user', req.user.iduser);

            return res.status(statusCode.OK).json({
                message: 'user has deleted',
            });
        } catch (err) {
            next(new appError(err));
        }
    },

    editUser: async (req, res, next) => {
        try {
            let { nameuser, password, email } = req.body;
            query = 'select * from user where email = ?';

            const [user] = await pool.execute(query, [email]);

            if (!nameuser) nameuser = user[0].nameuser;
            if (!password) password = user[0].password;

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            query = 'UPDATE user SET `nameuser` = ?, `password` = ? WHERE email = ?;';
            await pool.execute(query, [nameuser, hashed, email]);

            return res.status(statusCode.OK).json('user has edited');
        } catch (err) {
            next(new appError(err));
        }
    },

    logOut: (req, res, next) => {
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return res.status(statusCode.OK).json({ message: 'logged out successfully!' });
    },

    selectGiveCode: async (req, res, next) => {
        try {
            query = 'select iduser, givecode from promote where state = ?';
            const [getCode] = await pool.execute(query, ['con']);
            return res.status(statusCode.OK).json(getCode);
        } catch (err) {
            next(new appError(err));
        }
    },

    changeGiveCode: async (req, res, next) => {
        try {
            const iduser = req.body.iduser;
            query = 'update promote set state = ? where iduser = ?';
            await pool.execute(query, ['het', iduser]);
            return res.status(statusCode.OK).json({ message: 'code expired', iduser });
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = userController;
