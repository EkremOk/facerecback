const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-angular-42447',
    user : 'postgres',
    password : 'test',
    database : 'smart_brain'
  }
});



app.get('/', (req,res) => {
  res.status(200).json('Welcome on our web page!');
});

app.post('/signin', (req, res) => {signin.handleSignIn(req,res,db,bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

const PORT = process.env.PORT;

app.listen(PORT|| 3000, () => {
  console.log(`app is running and listening on port ${PORT}`);
})