import { type Request, type Response, type NextFunction } from 'express';
import * as zod from 'zod';

declare global {
	// @ts-ignore
	interface ApiRequest extends Request {}

	// @ts-ignore
	interface ApiResponse extends Response {}

	// @ts-ignore
	interface ApiNext extends NextFunction {}
}

export type RouteMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface RouteHandlerParams {
	req: ApiRequest;
	res: ApiResponse;
}

export type RouteRules = {
	loggedIn?: boolean;
	bodyData?: zod.ZodRawShape;
};

export type RouteHandler = (parms: RouteHandlerParams) => void;

export interface SetRoute {
	path: string;
	method: RouteMethods;
	rules?: RouteRules;
	handler: RouteHandler;
}

export {};
