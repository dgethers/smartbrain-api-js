const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

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
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  response.json(database.users[database.users.length - 1]);
});

app.get("/profile/:userId", (request, response) => {
  let found = false;
  database.users.forEach((user) => {
    if (user.id === request.params.userId) {
      found = true;
      return response.json(user);
    }
  });
  if (!found) {
    response.status(404).json("not found");
  }
});

app.put("/findface", (request, response) => {
  database.users.forEach((user) => {
    if (user.email === request.body.email) {
      found = true;
      user.entries++;
      response.json(user);
    }
  });
  response.status(404).json("not found");
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
