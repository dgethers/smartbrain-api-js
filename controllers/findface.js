const handleFindFace = (request, response, db) => {
  const { email } = request.body;
  db("users")
    .where("email", "=", email)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => response.json(entries))
    .catch((err) => response.status(400).json(err));
};

module.exports = {
  handleFindFace: handleFindFace,
};
