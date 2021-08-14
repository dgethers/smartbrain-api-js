const handleProfile = (request, response, db) => {
  const { userId } = request.params;
  db.select("*")
    .from("photo_history")
    .where({
      id: userId,
    })
    .catch((err) => response.status(400).json(err));
};

module.exports = {
  handleProfile: handleProfile,
};