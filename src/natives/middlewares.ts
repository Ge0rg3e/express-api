/**
 * Middleware to check if user is logged in.
 *
 * @param req The request object.
 * @param res The response object.
 * @param next The next function.
 */
export const isLoggedIn = async (req: ApiRequest, res: ApiResponse, next: ApiNext) => {
	// Check if session exists and is not empty
	if (!req.session || Object.keys(req.session).length === 0) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	// Continue to next middleware
	return next();
};
