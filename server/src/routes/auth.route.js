const passport = require('../config/passport');
const router = require('express').Router();
const { statusCode, message } = require('../data/httpResponse');
const appError = require('../errors/appError');
const { cookieOption } = require('../config/token');
// const userController = require('../../../client/src/controller/user.controller');
require('dotenv').config();

module.exports = (app) => {
    router.get(
        '/google/callback',
        passport.authenticate('google', { failureRedirect: '/login/failed' }),
        (req, res, next) => {
            // Successful authentication, redirect home.
            if (req.user) {
                res.cookie('accessToken', req.user.accessToken, cookieOption);
                res.cookie('refreshToken', req.user.refreshToken, cookieOption);

                const user = {
                    email: req.user.emails[0].value,
                    password: '',
                    verified: req.user.emails[0].verified,
                };

                req.body = user;
                req.headers.host = req.headers.host.replace(
                    process.env.PORT,
                    process.env.CLIENT_PORT
                );

                // userController.logIn(req, res, next);
            } else {
                next(new appError(statusCode.UNAUTHORIZED, message.ERROR));
            }
        }
    );

    router.get('/login/failed', (req, res) => {
        next(statusCode.UNAUTHORIZED).json(message.ERROR);
    });

    router.get(
        '/',
        passport.authenticate('google', {
            successRedirect: `${process.env.SERVER_DOMAIN}/auth`,
            failureRedirect: '/login/failed',
        })
    );

    router.post('/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) next(new appError(err));
            return res.redirect('/auth/logout');
        });
    });

    router.get('/logout', (req, res) => {
        return res.redirect('/login');
    });

    return app.use('/auth', router);
};
