const express = require('express');
const debug = require('debug')('app:server');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies'); 

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHanlder = require('./utils/middleware/notFoundHanlder');

// Enable Cors
app.use(cors());

// Body parser
app.use(express.json());

// Morgan
app.use(morgan('dev'));

authApi(app);
moviesApi(app);
userMoviesApi(app);

// Catch 404
app.use(notFoundHanlder);

// Errors middlewares
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, function() {
    debug(`Listening http://localhost:${config.port}`);
});
