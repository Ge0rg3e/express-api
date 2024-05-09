interface Session {
	id: string;
	username: string;
	fullName: string;
	email: string;
}

declare global {
	interface ApiRequest {
		session: Session | null;
	}
}

export {};
