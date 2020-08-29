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

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send(database.users);
});

app.post("/signin", (request, response) => {
  db.select("email", "hash")
    .from("login")
    .where("email", "=", request.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(request.body.password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", request.body.email)
          .then((user) => {
            response.json(user[0]);
          })
          .catch((err) => response.status(403).json("unable to get user"));
      }
      response.status(403).json("wrong credentials");
    })
    .catch((err) => response.status(403).json("wrong credentials"));
});

app.post("/register", (request, response) => {
  const { email, name, password } = request.body;
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            response.json(user);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => response.status(400).json("unable to register"));
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
