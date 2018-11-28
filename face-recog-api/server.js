const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'face_recog_db'
    }
});
const register = require('./controllers/register')
const signIn = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send(db.users)
})

app.post('/signin', (req,res) => signIn.handleSignIn(req,res,db,bcrypt))
app.post('/register', (req,res) => register.handleRegister(req,res,db,bcrypt))
app.get('/profile/:id', (req,res) => profile.handleSignIn(req,res,db))
app.put('/image', (req,res) => image.handleImage(req,res,db))
app.post('/imageurl', (req,res) => image.handleApiCall(req,res))

app.listen(3050, () => {
    console.log('server started on port 3050')
})


/*
to do in order 

/  -->    signin = POST   , res = Success/fail

/register -->  register = POST  , res = user

/profile/:userID -->  home of userprofile  ==  GET , res = user


*/