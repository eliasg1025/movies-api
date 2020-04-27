const express = require('express');

const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHanlder = require('./utils/middleware/notFoundHanlder');

// Body parser
app.use(express.json());

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
