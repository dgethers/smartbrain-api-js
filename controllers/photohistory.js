const handlePhotoHistory = (request, response, db) => {
    const {userId} = request.params;
    db.select("*")
        .from("users")
        .where("userId", "=", userId)
        .then((history) => {
            if (history.length) {
                response.status(200).json(history);
            } else {
                response.status(404);
            }
        })
        .catch((err) => console.log(err));
};

module.exports = {
    handlePhotoHistory: handlePhotoHistory,
};