const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHanlder = require('./utils/middleware/notFoundHanlder');

// Enable Cors
app.use(cors());

// Body parser
app.use(express.json());

// Morgan
app.use(morgan('dev'));


moviesApi(app);

// Catch 404
app.use(notFoundHanlder);

// Errors middlewares
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});
