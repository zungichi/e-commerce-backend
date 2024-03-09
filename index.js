if (process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require('express')
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require("connect-mongo");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const {User} = require('./models/users');
const userRoute = require('./routes/users');
const productRoute = require('./routes/products');
const cartRoute = require('./routes/carts');
const orderRoute = require('./routes/orders');

const app = express();
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/e-commerce';
const port = process.env.PORT || 3000;

// Mongo DB Connection
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', (err) => {
    console.log('MongoDB Connection Error', err);
});
db.once('open', () => {
    console.log('Connected MongoDB');
})

// Session configuration
const secret = process.env.SECRET || 'secret';
const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {secret}
});
store.on("error", (err) => {
    console.log("Session Store Error", err)
})
const sessionOption = {
    store,
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}

// Middlewares Setup
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.json());

// Express app management
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

app.get('/', (req, res) => {
    res.send('E-Commerce API is Online');
});

app.listen(port, () => {
    console.log(`Serving at port ${port}`);
});