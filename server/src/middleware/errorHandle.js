module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'server error';

    return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
    });
};
