const FACE_DETECTION_MODEL_ID = 'a403429f2ddf4b49b307e318f00e528b';

const handleApiCall = (request, response, clarifaiGRPC, db) => {

    const imageUrl = request.body.imageUrl;
    const userId = request.body.userId;

    db.select("*")
        .from("photo_history")
        .where("photo_url", "=", imageUrl)
        .andWhere("user_id", "=", userId)
        .then(photo => {
                if (photo.length) {
                    return response.status(200).json(photo[0].analytics);
                } else {
                    return clarifaiGRPC['clarifaiStub'].PostModelOutputs(
                        {
                            model_id: FACE_DETECTION_MODEL_ID,
                            inputs: [
                                {data: {image: {url: imageUrl}}}
                            ]
                        },
                        clarifaiGRPC['stubMetadata'],

                        (err, res) => {
                            if (err) {
                                throw new Error(err);
                            }

                            if (res.status.code !== 10000) {
                                response.status(500).json(res.status.description);
                            }

                            db.insert({
                                user_id: userId,
                                photo_url: imageUrl,
                                analytics: JSON.stringify(res.outputs[0].data.regions),
                                upload_datetime: new Date()
                                })
                                .into('photo_history')
                                .catch(err => console.log(err));

                            response.status(200).json(res.outputs[0].data.regions)
                        }
                    );
                }
            }
        )
        .catch(console.log);
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
