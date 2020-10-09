const handleRegister = (request, response, db, bcrypt) => {
    const {email, name, password} = request.body;
    if (!email || !name || !password) {
        return response.status(400).json("incorrect form submission");
    }

    bcrypt.hash(password, 1)
        .then(hash => {
            return db
                .returning(["id", "name", "email", "joined"])
                .insert({
                    email: email,
                    name: name,
                    joined: new Date(),
                    hash: hash
                })
                .into("users")
        })
        .then((user) => {
            response.json(user[0]);
        })
        .catch((err) => {
            console.log(err);
            response.status(400).json(err)
        });
}

module.exports = {
    handleRegister: handleRegister,
};
