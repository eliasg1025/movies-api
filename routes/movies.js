const express = require('express');
const MoviesService = require('../services/movies');

const {
    movieIdSchema,
    createMoviesSchema,
    updateMoviesSchema,
} = require('../utils/schemas/movies');

const validationHanlder = require('../utils/middleware/validationHanlder');

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService();

    router.get('/', async function (req, res, next) {
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });
            // throw new Error('Error getting movies');

            res.status(200).json({
                data: movies,
                message: 'movies listed',
            });
        } catch (err) {
            next(err);
        }
    });

    router.get(
        '/:movieId',
        validationHanlder({ movieId: movieIdSchema }, 'params'),
        async function (req, res, next) {
            const { movieId } = req.params;

            try {
                const movies = await moviesService.getMovie({ movieId });

                res.status(200).json({
                    data: movies,
                    message: 'movie retrieved',
                });
            } catch (err) {
                next(err);
            }
        }
    );

    router.post('/', validationHanlder(createMoviesSchema), async function (
        req,
        res,
        next
    ) {
        const { body: movie } = req;

        try {
            const createdMovieId = await moviesService.createMovie({ movie });

            res.status(201).json({
                data: createdMovieId,
                message: 'movie created',
            });
        } catch (err) {
            next(err);
        }
    });

    router.put(
        '/:movieId',
        validationHanlder({ movieId: movieIdSchema }, 'params'),
        validationHanlder(updateMoviesSchema),
        async function (req, res, next) {
            const { movieId } = req.params;
            const { body: movie } = req;

            try {
                const updatedMovieId = await moviesService.updateMovie({
                    movieId,
                    movie,
                });

                res.status(200).json({
                    data: updatedMovieId,
                    message: 'movie updated',
                });
            } catch (err) {
                next(err);
            }
        }
    );

    router.patch('/:movieId', async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;

        try {
            const patchedMovie = await moviesService.patchMovie({
                movieId,
                movie,
            });

            res.status(204).json({
                data: patchedMovie,
                message: 'movie patched',
            });
        } catch (err) {
            next(err);
        }
    });

    router.delete(
        '/:movieId',
        validationHanlder({ movieId: movieIdSchema }, 'params'),
        async function (req, res, next) {
            const { movieId } = req.params;

            try {
                const deletedMovieId = await moviesService.deleteMovie({
                    movieId,
                });

                res.status(200).json({
                    data: deletedMovieId,
                    message: 'movie deleted',
                });
            } catch (err) {
                next(err);
            }
        }
    );
}

module.exports = moviesApi;
