const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const isEmpty = require('../../validations/is-empty');

//Set Storage Engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/players');
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
// Load Player Model
const Player = require('../../models/Player')

// Load input Validation for registry and login
const validatePlayerInput = require('../../validations/player');

// @route POST api/players
// @description Create Player
// @access Private 
router.post('/',passport.authenticate('jwt',{session:false}),upload.single('photo'),(req,res)=>{
    console.log(req.file)
    const {errors , isValid} = validatePlayerInput(req.body,req.file);
    if(!req.user.admin)
    {   
        //If user is not an admin deny creation
        errors.admin="User not allowed to create"
        return res.status(400).json(errors.admin);
    }
    if(!isValid)
    {   
        //Stop upload and throw errors
        if(!isEmpty(req.file))
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
            });
        return res.status(400).json(errors);
    }
    const newPlayer=new Player({
        name:req.body.name,
        height:req.body.height,
        age:req.body.age,
        careerStart:req.body.careerStart,
        birthDate:req.body.birthDate,
        weight: req.body.weight,
        country: req.body.country,
    });
    Category.findOne({name: req.body.category})
    .then(category =>{
        if(category){
            newPlayer.category=category.name;
        }
        else{          
                errors.category="Category not found"
                return res.status(400).json(errors);
        }
    })
    if(!isEmpty(req.file)) {newPlayer.photo=req.file.path}
    else{errors.content='No file uploaded';
    return res.status(400).json(errors)}
    Player.findOne({name: req.body.name})
            .then(Player =>{
                if(Player){
                    //Stop the upload and throw an error
                if(!isEmpty(req.file))
                fs.unlink(req.file.path, (err) => {
                    if (err) throw err;
                    console.log('file was deleted');
                    });
                errors.title="This Player name is already in db"
                return res.status(400).json(errors);
                }
                else{
                    // new Player not found in the db
                    newPlayer.save()
                    .then(player=>res.json(player))
                    .catch(err => console.log(err)); 
                }
            })
            
     
    });
// @route GET api/players
// @description show players 
// @access Public
    router.get('/',(req,res)=>{
        Player.find()
            .then(players=> {res.json(players)})
            .catch(err => res.status(404).json({message: 'no players found'}))
    });    
// @route GET api/players/:id
// @description show player by id
// @access Public
router.get('/:id',(req,res)=>{
    Player.findById(req.params.id)
        .then(player=>res.json(player))
        .catch(err=>res.status(404).json({message : 'no player with this id found'}))
})

// @route DELETE api/players/:id
// @description delete Player
// @access Private
 
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors = {};
    Player.findById(req.params.id)
        .then(player => {
                // Delete Player from db
                player.remove()
                    .then(()=>{console.log('player removed')})})
        .catch(err=>res.status(404).json({message : 'no player with this id found'}))
    });
//@route POST /api/teams/sub/:id
//@description Follow a player
//@access  Private
router.post('/follow/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Player.findById(req.params.id)      
         .then(player=>{
          if(!player)
            {   console.log(req.params.id)
                return res.status(404).json({message: 'no player with this id to follow'})}
          else
          {
            if(req.user.interestList.filter(follow=>follow.entity==req.params.id).length>0){
            // get index to remove  
            const removeIndex = req.user.interestList
            .map(followToRemove=>followToRemove.entity)
            .indexOf(req.params.id); 
            //remove from array
            req.user.interestList.splice(removeIndex,1);
            //Save
            req.user.save().then(user=>res.json(user.interestList));
            // decrement number of followers in player
            player.nbrFollowers-=1;
            player.save()
                .then(console.log("number of followers updated"))
                .catch(err => {console.log(err)})
            }     
            else {// Add user handle to subs array
            req.user.interestList.unshift({entity : player.id});
            req.user.save().then(user =>res.json(user.interestList));
            // increment number of followers in team
            player.nbrFollowers+=1;
            player.save()
                .then(console.log("number of followers updated"))
                .catch(err => {console.log(err)})
              }
          }
        })
        .catch(err=>{console.log(err);res.status(404).json({message: 'no player with this id to follow '})})
  });
module.exports = router;