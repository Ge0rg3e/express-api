import { logger } from '~utils/helpers';
import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the provided URL.
 *
 * @returns {boolean} Returns true if the connection is successful, otherwise false.
 */
export const connectDatabase = async () => {
	try {
		// Connect to the MongoDB database
		await mongoose.connect(process.env.MONGO_URL!);

		// Log successful database connection
		logger('info', 'Database connected successfull.');
		return true;
	} catch (error) {
		// Log database connection failure
		logger('error', 'Database connection failed.', error);
		return false;
	}
};
