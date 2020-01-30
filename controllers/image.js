const Clarifai = require ('clarifai');

//My api key for use
const app = new Clarifai.App({
    apiKey: '98ca3d8336784236aa279a10ddf62d3b'
   });

   const handleApiCall = (req,res) => {
   app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data=> {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
   } 

const handleImageApi = (req,res,db)=>{
    const{id} = req.body;
   db('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries =>{
       res.json(entries[0]);
    
   })
   .catch(err=> res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImageApi:handleImageApi,
    handleApiCall:handleApiCall
}