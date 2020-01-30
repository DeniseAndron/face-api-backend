const express = require ('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require ('./controllers/register');
const signin = require('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');

// Connecting the database with our server
const db = knex ({
        client: 'pg',
        connection: {
          connectionString : process.env.DATABASE_URL,
          ssl:true,
          
        }
    });




const app = express();
/*app.use(express.urlencoded({extended: false}));*/
app.use(express.json());
app.use(cors());



app.get('/', (req,res) => {
    res.send('it is working!');
})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)});

app.put('/image',(req,res)=> {image.handleImageApi(req,res,db)});
app.post('/imageurl',(req,res)=> {image.handleApiCall(req,res)});



// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})


//--> res = this is working
// signin --> post - the user info , response success/fail
//register --> post - add the data to database
// profile /: userId --> GET = return the user
//image --> PUT --< return user update how many images 
