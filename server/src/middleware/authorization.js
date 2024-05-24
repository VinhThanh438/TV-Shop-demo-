const jwt = require('jsonwebtoken');
const appError = require('../errors/appError');
const { statusCode, message } = require('../data/httpResponse');
const { token, isTokenExpried, cookieOption } = require('../config/token');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    let accessToken = req.cookies.accessToken;

    if (!accessToken) next(new appError(statusCode.UNAUTHORIZED, message.UNAUTHORIZED));

    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, data) => {
        if (err) {
            let refreshToken = req.cookies.refreshToken;

            // check if the access token has expired
            if (isTokenExpried(accessToken)) {
                // decode the access token and get the data to create new access and refresh token
                const decode = jwt.decode(accessToken);
                const user = {
                    iduser: decode.iduser,
                    email: decode.email,
                };

                // check if the refresh token has expired
                if (isTokenExpried(refreshToken)) {
                    refreshToken = token.refreshToken(user);
                }

                accessToken = token.accessToken(user);
            }

            res.cookie('accessToken', accessToken, cookieOption);
            res.cookie('refreshToken', refreshToken, cookieOption);
        }
    });
    return next();
};

module.exports = verifyToken;
