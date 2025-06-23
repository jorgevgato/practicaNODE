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

## API

Base URL: http://localhost.3000/api

### Product list

GET /api/products

```json
"results": [
  {
    "_id": "685702d107dbd148dbd3845c",
    "name": "Nokia 3330",
    "owner": "685702d107dbd148dbd38457",
    "price": 28,
    "image": "nokia3330.jpg",
    "tags": [
      "mobile"
    ],
    "__v": 0
  },
  {
    "_id": "685702d107dbd148dbd3845d",
    "name": "Blackberry",
    "owner": "685702d107dbd148dbd38457",
    "price": 5,
    "image": "blackberry.jpg",
    "tags": [
      "mobile"
    ],
    "__v": 0
  },
]
```
