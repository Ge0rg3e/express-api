import { isLoggedIn } from './middlewares';
import { SetRoute } from './router.types';
import { logger } from '~utils/helpers';
import { Router } from 'express';
import * as zod from 'zod';

/**
 * Validates request data against the provided schema.
 *
 * @param data The data to validate.
 * @param schema The schema to validate against.
 * @returns True if validation succeeds, otherwise an error object with details.
 */
const validateRequestData = async (data: object | undefined, schema: zod.ZodRawShape) => {
	if (!data) return true;
	try {
		await zod.object(schema).parseAsync(data);
		return true;
	} catch (error: any) {
		return { error: true, errorMessage: error.issues.map((issue: any) => `${issue.path[0]}(${issue.expected})`).join(', ') + ' is required.' };
	}
};

/**
 * Validates body, query, and params data against provided schemas.
 *
 * @param data The data to validate.
 * @param schema The schema to validate against.
 * @param res The response object.
 * @returns True if validation succeeds, otherwise false.
 */
const validateData = async (data: object | undefined, schema: zod.ZodRawShape, res: any) => {
	const validationResult = await validateRequestData(data, schema);
	if (validationResult !== true) {
		res.status(400).json({ error: validationResult.errorMessage });
		return false;
	}
	return true;
};

/**
 * Sets up a route on the router.
 *
 * @param router The express router.
 * @param params Parameters to set the route.
 */
const setRoute = (router: Router, params: SetRoute) => {
	const middlewares: any[] = [];

	if (params.rules?.loggedIn) {
		middlewares.push(isLoggedIn);
	}

	router[params.method](params.path, ...middlewares, async (req: any, res: any) => {
		try {
			// Validate body data
			if (!(await validateData(req.body, params.rules?.bodyData || {}, res))) return;

			// Execute route handler
			return await params.handler({ req, res });
		} catch (error) {
			await logger('error', `{gray}${req.path} -> {red}`, error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	});
};

/**
 * Creates a new express router.
 *
 * @param routerName The name of the router.
 * @returns An object with methods to set routes and the router itself.
 */
export const createRouter = (routerName: string) => {
	const router = Router();

	return {
		/**
		 * Sets a route on the router.
		 *
		 * @param params Parameters to set the route.
		 */
		set: (params: SetRoute) => setRoute(router, params),
		routerName,
		router
	};
};

export {};
