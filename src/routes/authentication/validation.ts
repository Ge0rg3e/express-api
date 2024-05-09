import * as zod from 'zod';

export const signInSchema = {
	email: zod.string().email(),
	password: zod.string().min(4)
};

export const signUpSchema = {
	username: zod.string().min(4),
	fullName: zod.string().min(4),
	email: zod.string().email(),
	password: zod.string().min(4)
};
