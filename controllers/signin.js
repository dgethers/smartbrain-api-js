const handleSignin = (request, response, db, bcrypt) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).json("incorrect form submission");
  }

  db.select("*")
    .from("users")
    .where("email", "=", email)
    .then((data) => {
        bcrypt.compare(password, data[0].hash)
            .then(isValid => {
                if (isValid) {
                    const {id, name, email, joined} = data[0];
                    return response.json({
                        id: id,
                        name: name,
                        email: email,
                        joined: joined
                    })
                } else {
                    response.status(403).json("wrong credentials");
                }
            })
            .catch(err => console.log('bcrypt compare', err));
    }).catch((err) => {
        console.log('db user lookup', err);
        response.status(403).json("wrong credentials");
    });
};

module.exports = {
  handleSignin: handleSignin,
};
