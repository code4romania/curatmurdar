'use strict';

let express = require('express');
let path = require('path');
try {
	let dotenv = require('dotenv');
	dotenv.load();
} catch (err) {
	console.log('----------- no dotenv module (no problem) -----------');
}

// load routes
let routes = require('./routes');

let env = process.env.NODE_ENV || 'development';
let app = express();

app.use(express.static(path.join(__dirname, './build')));
app.use(routes);

module.exports = app;
