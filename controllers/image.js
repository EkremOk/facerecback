const Clarifai =  require('clarifai');

const app = new Clarifai.App({
  apiKey: 'c1f4bc9ee1b54b58ba285de5ce2bf4b6'
 });

 const handleApiCall = (req, res) => {
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API...'))
 }


const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id','=', Number(id))
  .increment('entries',1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get count'))
  }

  module.exports = {
    handleImage:handleImage,
    handleApiCall: handleApiCall
  }