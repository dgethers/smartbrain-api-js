const handleProfile = (request, response, db) => {
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
};

module.exports = {
  handleProfile: handleProfile,
};