const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt');
const cors = require ('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
    client: 'pg',
    connection: {
    host : process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req,res) => { res.send('it is working!')})

app.post('/signin', signin.handleSignIn(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfile(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', (req,res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3100, ()=> {
	console.log(`App is running on port ${process.env.PORT}`);
})