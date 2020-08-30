const Clarifai = require("clarifai");
const { response } = require("express");

const app = new Clarifai.App({
  apiKey: "144746392f72454d9c05ce2408c52af9",
});

const handleApiCall = (request, response) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, request.body.imageUrl)
    .then((response) => response.outputs[0].data.regions)
    .then((regions) => response.status(200).json(regions));
};

//TODO: Deprecate this
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
  handleApiCall: handleApiCall,
};
