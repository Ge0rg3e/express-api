import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import hpp from 'hpp';

import { getSystemIPv4, logger } from '~utils/helpers';
import { connectDatabase } from '~database/index';
import { setupRoutes } from '~routes/index';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Setup middlewares
app.use(
	cookieSession({
		name: process.env.SESSION_NAME,
		secret: process.env.SESSION_SECRET
	})
);
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(hpp());

// Setup routes
setupRoutes(app);

// Get app port
const appPort = process.env.APP_PORT;

// Start the server
app.listen(appPort, async () => {
	// Connect to the database
	await connectDatabase();

	// Get system IPv4 address
	const systemIPv4 = await getSystemIPv4();

	// Log server information
	logger('info', `API running at http://${systemIPv4}:${appPort}`);
});
