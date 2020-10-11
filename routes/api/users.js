const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const isEmpty = require('../../validations/is-empty');

//Set Storage Engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/avatars');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });
// Filter only images
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
// Init Upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
// Load User Model
const User = require('../../models/User')

// Load input Validation for registry and login
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login'); 

// @route POST api/users/register
// @description register users  
// @access Public
router.post('/register',upload.single('avatar') , (req,res)=>{
  let errors = {};
    //Check Validation
    /*const {errors , isValid} = validateRegisterInput(req.body);
    if(!isValid)
    {   
        //Stop upload and throw errors
        if(!isEmpty(req.file))
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
            console.log('file was deleted');
          });
        return res.status(400).json({errors : errors , success : false});
    }*/


    User.findOne({email: req.body.email})
        .then(user => {
        if(user) {
            //Stop the upload and throw an error
            if(!isEmpty(req.file))
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
                console.log('file was deleted');
              });
            errors.email='Email already exists';
            return res.status(400).json({msg : errors.email , success : false})
        } 
        else {
          
          const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
          });
          //Add image path if user uploads an image
          if(!isEmpty(req.file)) {newUser.avatar=req.file.path};

          bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if (err) throw err;
            newUser.password=hash;
            newUser.save()
               .then(user => res.json({user : user,success:true,msg: 'Registration successful , Redirected to login page'}
                ))
               .catch(err => console.log(err))
            })
          }) 
        }
        })
});
//@route POST /api/users/login
//@description Login user / return Token
//@access  Public
router.post('/login',(req,res) => {
const email = req.body.email;
const password = req.body.password;
let errors = {};
//Check Validation
/*const {errors , isValid} = validateLoginInput(req.body);
    if(!isValid)
    {
        return res.status(400).json({errors : errors , success : false});
    }*/
    User.findOne({email})
        .then(user =>
            {
            //Check if user with the email exists
            if (!user) {
                errors.email='No user matches this email';
                return res.status(404).json({msg : errors.mail , success : false});}
            //Check if password is valid 
            bcrypt.compare(password,user.password)
                    .then(isValid => {
                    if (isValid) {
                        // variable containing user data
                        const payload = {id : user.id , username: user.username ,avatar: user.avatar,admin: user.admin}
                        // Sign Token
                        message= 'Login successful , Welcome '+user.username
                        jwt.sign(
                            payload,
                            keys.secret,
                            {expiresIn: 3600},
                            (err,token) => {
                            res.json({
                                user: payload,
                                success: true,
                                token: 'Bearer ' + token,
                                msg: message
                                })
                            });
                        }
                    else {
                        errors.password='Invalid password';
                        res.status(404).json({msg : errors.password , success : false})}                 
                });

        });
});
//@route GET /api/users/current
//@description Return current user
//@access  Private
router.get('/current',passport.authenticate('jwt',{session: false}), (req, res)=>{
res.json({
id: req.user.id,
username: req.user.username,
avatar: req.user.avatar,
admin: req.user.admin,
});
});
//@route GET /api/users/follow
//@description Return current followed matches
//@access  Private
router.get('/follow',passport.authenticate('jwt',{session: false}), (req, res)=>{
  User.findById(req.user.id)
      .populate({path: 'matchesFollowed.match',populate:{path: 'teamOne teamTwo'}})
      .then(user  =>  res.json (user.matchesFollowed))
      .catch(err => console.log(err))
  });
//@route GET /api/users/interest
//@description Return current followed teams/players
//@access  Private
router.get('/interest',passport.authenticate('jwt',{session: false}), (req, res)=>{
  User.findById(req.user.id)
      .populate({path: 'interestList.entity'})
      .then(user  =>  res.json (user.interestList))
      .catch(err => console.log(err))
  });
module.exports = router;
