const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.token = {
    accessToken: (data) =>
        jwt.sign(
            {
                iduser: data.iduser,
                email: data.email,
                name: data.nameuser,
                role: data.role,
                sdt: data.sdt,
                avatar: data.avatar,
                code: data.code,
                state: data.state,
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '60s',
            }
        ),
    refreshToken: (data) =>
        jwt.sign(
            {
                iduser: data.iduser,
                email: data.email,
                name: data.nameuser,
                role: data.role,
                sdt: data.sdt,
                avatar: data.avatar,
                code: data.code,
                state: data.state,
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: '365d',
            }
        ),
};

module.exports.cookieOption = {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    // secure: true,
};

module.exports.isTokenExpried = (token) => {
    const decodeToken = jwt.decode(token);
    const expirationTime = decodeToken.exp * 1000;
    const currentTime = Date.now().valueOf() / 1000;
    return expirationTime > currentTime;
};
