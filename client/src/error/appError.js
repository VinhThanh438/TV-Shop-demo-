module.exports = class appError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode || 500;
        this.message = message || 'server error';

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
};
