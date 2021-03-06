// External/ 3rd Party Dependancies;
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

// Middleware:
const checkForSession = require('./middlewares/checkForSession');

// Controller Functions/ Methods:
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');


const app = express();

// Destructuring from dotenv file:
let { SESSION_SECRET, SERVER_PORT } = process.env;

// Middleware (top-level)
// End-point Middleware
app.use(bodyParser.json());

// Session middleware;
app.use(session({
 secret:SESSION_SECRET,
 resave: false,
 saveUninitialized: true,
}));

// middleware;
app.use(checkForSession);

// express.static middleware serves the pre-built front-end.
app.use(express.static(`${__dirname}/build`));

// ENDPOINTS:
// Swag_Controller End-Points:
app.get('/api/swag', swag_controller.read);

// Auth_Controller End-Points:
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

// Cart_Controller End-Points:
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

// Search_Controller End-Points:
app.get('/api/search', search_controller.search);


// Server listening/ running:
app.listen(SERVER_PORT, () => {
 console.log(`The magice happens on port: ${SERVER_PORT}`)
});
