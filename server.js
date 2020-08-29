const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "password",
    database: "smartbrain",
  },
});

db.select("*").from("users").then(console.log);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "Korra",
      email: "avatar-korra@gmail.com",
      password: "water",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (request, response) => {
  response.send(database.users);
});

app.post("/signin", (request, response) => {
  const dbUser = database.users[0];
  const requestUser = request.body;
  console.log("requestUser", requestUser);

  if (
    requestUser.email === dbUser.email &&
    requestUser.password === dbUser.password
  ) {
    response.json(dbUser);
  } else {
    response.status(403).json("error loggin in");
  }
});

app.post("/register", (request, response) => {
  const { email, name, password } = request.body;
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then((user) => {
      response.json(user);
    })
    .catch((err) => response.status(400).json("unable to register"));
});

app.get("/profile/:userId", (request, response) => {
  const { userId } = request.params;
  db.select("*")
    .from("users")
    .where({
      id: userId,
    })
    .then((user) => {
      console.log("user", user);
      if (user.length) {
        response.json(user);
      } else {
        response.status(404).json("Not found");
      }
    })
    .catch((err) => response.status(400).json(err));
});

app.put("/findface", (request, response) => {
  const { email } = request.body;
  db("users")
    .where("email", "=", email)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => response.json(entries))
    .catch((err) => response.status(400).json(err));
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
