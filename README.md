# Express API

This Express API Boilerplate, built with TypeScript, Express.js, Mongoose and SWC offers a quick and straightforward setup for new projects.

## ⚙️ Setup

```bash
$ git clone https://github.com/Ge0rg3e/express-api.git
$ npm install
```

#### Create a `.env` file using the example provided in `.env.example`.

```bash
# Dev mode
$ npm run dev

# Production mode
$ npm run start
```

## 📙 How to Create a New Route?

To create a new route, follow these steps:

-   Create a new folder in `src/routes` and add an `index.ts` file (see below what you need to put in that index.ts).
-   Import your new route in `src/routes/index.ts` at the `setupRoutes` function.

An example of how you should create a new route:

```ts
// > src/routes/myroute/index.ts
import { createRouter } from '~natives/router';
import * as zod from 'zod';

const router = createRouter('/myroute');

router.set({
	path: '/hello',
	method: 'post',
	rules: {
		loggedIn: false,
		bodyData: { username: zed.string().min(4).max(10) }
	},
	async handler({ req, res }) {
		const { username } = req.body;

		return res.status(200).send(`Hello ${username}!`);
	}
});

export default router;
```

## 🔗 Native routes

### Authentication:

```http
GET /authentication/getSession
```

<br />

```http
POST /authentication/signin
{
  "email": "String",
  "password": "String"
}
```

<br />

```http
POST /authentication/signup
{
  "username": "String",
  "fullName": "String",
  "email": "String",
  "password": "String"
}
```

<br />

```http
GET /authentication/sigout
```

### Movies:

```http
GET /movies/all
```

<br />

```http
POST /movies/new
{
  "name": "String",
  "type": "String",
  "score": "Number"
}
```

<br />

```http
DELETE /movies/delete
{
  "id": "String"
}
```
