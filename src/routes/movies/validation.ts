import * as zod from 'zod';

export const newMovieSchema = {
	name: zod.string(),
	type: zod.string(),
	score: zod.number()
};

export const deleteMovieSchema = {
	id: zod.string()
};
