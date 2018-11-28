const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '802b37a4b5174c76b0e7231d0ef356ab'
  });


const handleApiCall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('error gettin api'))
}

const handleImage = (req, res,db) => {
    const { id } = req.body;
    db('users').where('id', '=', id).increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries)
        })
        .catch(err => res.status(404).json('error updating entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}