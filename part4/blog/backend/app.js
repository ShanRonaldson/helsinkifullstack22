
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('express-async-errors');

const blogRouter = require('./controllers/blogs');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to mongoDB');
	})
	.catch(err => {
		logger.error('error connecting to MongoDb', err.message);
	});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
