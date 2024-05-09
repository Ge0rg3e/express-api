import { type Express } from 'express';

// Routes
import authentication from './authentication';
import movies from './movies';

// Functions
export const setupRoutes = (app: Express) => [authentication, movies].map((route) => app.use(route.routerName, route.router));
