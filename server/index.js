// External/ 3rd Party Dependancies;
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const checkForSession = require('./middlewares/checkForSession');
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');


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


// ENDPOINTS:
// Swag_Controller End-Points:
app.get('/api/swag', swag_controller.read);

// Auth_Controller End-Points:
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);


// Server listening/ running:
app.listen(SERVER_PORT, () => {
 console.log(`The magice happens on port: ${SERVER_PORT}`)
});
