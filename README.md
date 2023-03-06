# Subscription Project

This project was built only for testing purposes, we have some customers who they can register and then login
to our application, each customer have a credit number.

we can add/update subscriptions, and customers can buy them.
after buying until subscription expire(whitch is 1 month by default ) or customer deactive subscription,
each 10 min we create new invoice for customer base on subscription price and decrease that price from it's credit.

customers can see all of their subscriptions and invoices, and we log customers actions in database as well.

## Tech

we use Js(node.js) and Express.js for this project, PostgreSql as database, and Knex as query builder

## Installation

1. first of all make sure you have node.js and postgreSql installed on your system

```js
node --version
//v16.18.1

which psql
// if Postgres is installed you'll get a response with the path to the location of the Postgres installed

```

2. use command `npm i` to install dependencies

3. go to `src/config` and create a file called `dev.env` and add all of required environment variables.
   sample file is in `src/config/sample.env`

4. use one of below scripts to run project :)

```bash
npm run start:prod
npm run start:dev
```

## Api Documentation

for calling Apis you can use swagger ui `http://localhost:PORT/api-docs` for api documentation or sample curl requests from next section.

## Sample requests

here are some sample requests to know exactly how to call Apis

### Register new customer

```bash
curl --location --request POST 'localhost:3000/customer/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "fateme",
    "password": "123",
    "credit": 20
}'
```

### Login customer

returned token will expire in 1 hour

```bash
curl --location --request POST 'localhost:3000/customer/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "fateme",
    "password": "123"
}'
```

### Add new subscription

```bash
curl --location --request POST 'localhost:3000/subscription/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "vm1",
    "price":"2"
}'
```

### Update a subscription

```bash
curl --location --request PATCH 'localhost:3000/subscription/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "new vm2",
    "price": 6
}'
```

### Get all of subscriptions

all request queries(limit, offset) are optional

```bash
curl --location --request GET 'localhost:3000/subscription/?limit=4&offset=0' \
```

### Buy a subscription as customer

```bash
curl --location --request GET 'localhost:3000/subscription/buy/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...'
```

### Deactive a subscription as customer

```bash
curl --location --request PATCH 'localhost:3000/subscription/1/deactive' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC...'
```

### Get all of customer subscriptions

all request queries(limit, offset, isActive) are optional

```bash
curl --location --request GET 'localhost:3000/subscription/customer?limit=4&offset=0&isActive=1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...'
```

### Get all of created invoices for customer

all request queries(limit, offset) are optional

```bash
curl --location --request GET 'localhost:3000/invoice?limit=2&offset=3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX...'
```

### Get all invoices for one customer subscription

all request queries(limit, offset) are optional

```bash
curl --location --request GET 'localhost:3000/invoice/10?limit=10&offset=0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC...'
```
