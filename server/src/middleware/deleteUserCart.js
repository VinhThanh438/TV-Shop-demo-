const { query } = require('../config/connectDB');
const pool = require('../config/connectDB');
const appError = require('../errors/appError');
const { statusCode, message } = require('../data/httpResponse');

const deleteUserCart = async (req, res, next) => {
    try {
        let query;
        const email = req.body.email;
        query = 'select * from user where email = ?';

        const [user] = await pool.execute(query, [email]);

        if (user.length == 0) next(new appError(statusCode.NOT_FOUND, 'user does not exist'));

        const iduser = user[0].iduser;
        req.user = { email: user[0].email, iduser: user[0].iduser };

        query = 'delete from cart where iduser = ?';

        await pool.execute(query, [iduser]);

        next();
    } catch (err) {
        next(new appError(err));
    }
};

module.exports = deleteUserCart;
