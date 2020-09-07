# Smart Brain API

Express application build around [Clarifai API](https://docs.clarifai.com/)

## Setup

`npm install`
`npm run start:dev` - start server

run _table.sql_ to create tables

### Environment variables that need to be setup
`NODE_ENV=development` - if you are going to use .env file
`DATABASE_URL=<dbengine>://<username>:<password>@<host>:<port>/<schema/db>`
`CLARIFAI_API_KEY=<api key>`

## Endpoints

_/signin_

`{
    "email" : <email>
    "password" : <password>
}`

Encrypts password and compares hash to hash stored in database

_/register_

`{
    "name": <full name>,
    "email": <email>,
    "password": <password>
}`

Creates a new user that can sign in. Password is encrypted and the hash stored in the database

_/profile/:userId_

Get user info by id

_/findface_

`{
    "imageUrl": "https://southkerrycaller.files.wordpress.com/2014/03/family.jpg"
}`

Get highlighted regions of detected faces

## Database Schema

`Users
id serial
name varchar
email text
entries bigint
joined bigint`

`Login
id serial
hash
email`