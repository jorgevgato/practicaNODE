# nodePOP

## Installation

Install dependencies with:

```sh
npm install
```

Copy environment variables example to .env:
```sh
cp .env.example .env
```

Review your new .env values to match your configuration.

Only on FIRST deploy, use this command to initialize database:

```sh
npm run initDB
```

This command will DELETE the full database and create a new one with two users: user1 and user2.

user1 has 4 saved products.

user2 has 3 saved products.

On product creation from user profile (/products/new), path to an existing image is suggested as product's image.