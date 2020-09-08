const handleRegister = (request, response, db, bcrypt) => {
  const { email, name, password } = request.body;
  if (!email || !name || !password) {
    return response.status(400).json("incorrect form submission");
  }

  bcrypt.hash(password, 1)
      .then(hash => {
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
          }).catch((err) => {
              console.log(err);
              response.status(400).json(err)
          });
      })
};

module.exports = {
  handleRegister: handleRegister,
};
