const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

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
  const user = database.users[0];
  if (
    request.body.email === user.email &&
    request.body.password === user.password
  ) {
    response.json("success");
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

app.get("/profile/:id", (request, response) => {
  const { id } = request.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return response.json(user);
    }
  });
  if (!found) {
    response.status(404).json("not found");
  }
});

app.put("/image", (request, response) => {
  const { id } = request.body;
  console.log('id', id);
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return response.json(user);
    }
  });
  if (!found) {
    response.status(404).json("not found");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
