# nodePOP

## Despliegue de Servidores

IP: 34.204.242.49
DNS: ec2-34-204-242-49.compute-1.amazonaws.com

Dominios:
nodepopw18.duckdns.org
react.nodepopw18.duckdns.org
node.nodepopw18.duckdns.org

---

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

Token is required to be sent as 'Authorization' in order to use the following functionalities:

#### GET /products

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

#### GET /products/_id

```json
"results":
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
```

#### POST /products

This will create a new product in database. It allows to upload an image for the product if sent as form-data, but it's not mandatory.

Fields recommended:

```json
{
  "name": "String",
  "price": "Number",
  "image": "File",
  "tags": ["String"]
}
```

#### PUT /products/_id

This will update one or many fields of an existing product.

#### DELETE /products/_id

This will delete the product from database, including its image.