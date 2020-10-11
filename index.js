const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');



const users = require('./routes/api/users');
const players = require('./routes/api/players');
const teams = require('./routes/api/teams');
const categories = require('./routes/api/categories');
const matches = require('./routes/api/matches');

const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Header",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  
//Public Folder
app.use('/public', express.static('public'));

//Body parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;
//Connect to MongoDB
mongoose
    .connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>console.log("MongoDB connected"))
    .catch(err => console.log(err))

//Passport Middleware
app.use(passport.initialize());

//Passport Config 
require('./config/passport')(passport); 

//Index test Route
app.get('/', (req, res)=> {
    res.send('Server running!');
   });

   
//Use Routes
app.use('/api/users',users);
app.use('/api/teams',teams);
app.use('/api/players',players);
app.use('/api/categories',categories);
app.use('/api/matches',matches);

//launch server
const port = 5000;

app.listen( port  , () => {
console.log(`Server started at port ${port}`);   
});