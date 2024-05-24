const getAxios = require('axios');
require('dotenv').config();

const axios = getAxios.create({
    baseURL: `${process.env.SERVER_DOMAIN}`,
    withCredentials: true,
});

module.exports = axios;
