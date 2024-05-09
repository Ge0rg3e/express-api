import { signInSchema, signUpSchema } from './validation';
import AccountModel from '~database/models/accounts';
import { createRouter } from '~natives/router';

const router = createRouter('/authentication');

router.set({
	path: '/getSession',
	method: 'get',
	rules: {
		loggedIn: true // Requires user to be logged in
	},
	async handler({ req, res }) {
		return res.status(200).json({ session: req.session });
	}
});

router.set({
	path: '/signin',
	method: 'post',
	rules: {
		bodyData: signInSchema // Validates request body against schema
	},
	async handler({ req, res }) {
		const { email, password } = req.body;

		// Find the account by email and password
		const findAccount = await AccountModel.findOne({ email, password });

		// If account not found, send 401 Unauthorized
		if (!findAccount) {
			return res.status(401).json({ error: 'Invalid email or password.' });
		}

		// Set session data
		req.session = {
			id: findAccount._id,
			username: findAccount.username,
			fullName: findAccount.fullName,
			email: findAccount.email
		};

		// Respond with success message
		return res.status(200).json({ message: 'Signin success' });
	}
});

router.set({
	path: '/signup',
	method: 'post',
	rules: {
		bodyData: signUpSchema // Validates request body against schema
	},
	async handler({ req, res }) {
		const { username, fullName, email, password } = req.body;

		// Check if email is already used
		const emailIsUsed = await AccountModel.exists({ email });

		// If email is already used, send 409 Conflict
		if (emailIsUsed) {
			return res.status(409).json({ error: 'Email is already used.' });
		}

		// Create a new account
		await AccountModel.create({ username, fullName, email, password });

		// Respond with success message
		return res.status(200).json({ message: 'Signup success' });
	}
});

router.set({
	path: '/signout',
	method: 'get',
	rules: {
		loggedIn: true // Requires user to be logged in
	},
	async handler({ req, res }) {
		// Clear session data by clearing cookie and setting session to null
		await res.clearCookie(`${process.env.SESSION_NAME}`);
		await res.clearCookie(`${process.env.SESSION_NAME}.sig`);
		req.session = null;

		// Respond with success message
		return res.status(200).json({ message: 'Signout success' });
	}
});

export default router;
