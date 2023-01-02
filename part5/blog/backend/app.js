
//packages
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('express-async-errors');

//routers
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const ratingRouter = require('./controllers/rating');

//utils
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

//initial setup
const app = express();

logger.info('connecting to', config.MONGODB_URI);

//connection
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

//controller setup
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/rating',ratingRouter);

//error handlers
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
