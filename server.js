const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const dotenv = require('dotenv');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const findFace = require("./controllers/findface");

if (process.env.NODE_ENV === 'development') {
    dotenv.config();
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: "pg",
    connection: process.env.DATABASE_URL,
});

const clarifaiApp = new Clarifai.App({
    apiKey: `${process.env.CLARIFAI_API_KEY}`,
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (request, response) => {
    signin.handleSignin(request, response, db, bcrypt);
});

app.post("/register", (request, response) => {
    register.handleRegister(request, response, db, bcrypt);
});

app.get("/profile/:userId", (request, response) => {
    profile.handleProfile(request, response, db);
});

app.put("/findface", (request, response) => {
    findFace.handleApiCall(request, response, clarifaiApp);
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});
