// External/ 3rd Party Dependancies;
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

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





// Server listening/ running;
app.listen(SERVER_PORT, () => {
 console.log(`The magice happens on port: ${SERVER_PORT}`)
});
