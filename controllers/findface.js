const Clarifai = require("clarifai");

const handleApiCall = (request, response, clarifaiApp) => {
    clarifaiApp.models
        .predict(Clarifai.FACE_DETECT_MODEL, request.body.imageUrl)
        .then((response) => response.outputs[0].data.regions)
        .then((regions) => response.status(200).json(regions))
        .catch((err) => {
            console.log('handleApiCall promise error', err)
            response.status(400).json(err)
        })
};

/**
 * @deprecated TODO: remove this
 */
const handleFindFace = (request, response, db) => {
    const {email} = request.body;
    db("users")
        .where("email", "=", email)
        .increment("entries", 1)
        .returning("entries")
        .then((entries) => response.json(entries))
        .catch((err) => {
            console.log('handleFindFace promise error', err)
            response.status(400).json(err)
        });
};

module.exports = {
    handleFindFace: handleFindFace,
    handleApiCall: handleApiCall,
};
