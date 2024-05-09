import { deleteMovieSchema, newMovieSchema } from './validation';
import MovieModel from '~database/models/movies';
import { createRouter } from '~natives/router';

const router = createRouter('/movies');

router.set({
	path: '/all',
	method: 'get',
	rules: {
		loggedIn: true // Requires user to be logged in
	},
	async handler({ res }) {
		// Retrieve all movies from database
		const movies = await MovieModel.find();

		// Respond with JSON array of movies
		return res.status(200).json({ movies });
	}
});

router.set({
	path: '/new',
	method: 'post',
	rules: {
		loggedIn: true, // Requires user to be logged in
		bodyData: newMovieSchema // Validates request body against schema
	},
	async handler({ req, res }) {
		// Extract movie details from request body
		const { name, type, score } = req.body;

		// Get user ID from session
		const created_by = req.session!.id!;

		// Create new movie in database
		const newMovie = await MovieModel.create({ name, type, score, created_by });

		// Respond with JSON object of newly created movie
		return res.status(200).json({ movie: newMovie });
	}
});

router.set({
	path: '/delete',
	method: 'delete',
	rules: {
		loggedIn: true, // Requires user to be logged in
		bodyData: deleteMovieSchema // Validates request body against schema
	},
	async handler({ req, res }) {
		// Extract movie ID from request body
		const { id } = req.body;

		// Check if movie exists in database
		const exists = await MovieModel.exists({ _id: id });

		// If movie doesn't exist, send a 404 error response
		if (!exists) {
			return res.status(404).json({ error: 'Movie not found' });
		}

		// Delete movie from database
		await MovieModel.deleteOne({ _id: id });

		// Respond with success message
		return res.status(200).json({ message: 'Movie deleted successfully' });
	}
});

export default router;
