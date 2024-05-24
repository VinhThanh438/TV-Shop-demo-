const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const errorHandle = require('./middleware/errorHandle');
const flash = require('flash');
const cookieParser = require('cookie-parser');

const productRoutes = require('./routes/products.route');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const allRoutes = require('./routes/all.route');
const orderRoutes = require('./routes/order.route');
require('express-async-errors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(morgan());
app.use(
    cors({
        origin: `${process.env.CLIENT_DOMAIN}`,
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: process.env.COOKIE_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(flash());

authRoutes(app);
userRoutes(app);
productRoutes(app);
orderRoutes(app);
allRoutes(app);
app.use(errorHandle);

app.listen(port, () => {
    console.log('server is running on port ', port);
});
