const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const findFace = require("./controllers/findface");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "password",
    database: "smartbrain",
  },
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
  findface.handleFindFace(request, response, db);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
