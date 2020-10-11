const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const isEmpty = require('../../validations/is-empty');

//Set Storage Engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/teams');
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
// Load Team Model
const Team = require('../../models/Team')
// Load Category Model
const Category = require('../../models/Category')

// Load input Validation for registry and login
const validateTeamInput = require('../../validations/team');

// @route POST api/teams
// @description Create team
// @access Private 
router.post('/',passport.authenticate('jwt',{session:false}),upload.single('logo'),(req,res)=>{
    const {errors , isValid} = validateTeamInput(req.body,req.file);
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
    const newTeam=new Team({
        name:req.body.name,
        coach:req.body.coach,
        league:req.body.league,
        country:req.body.country,
        foundationDate:req.body.foundationDate,
        president: req.body.president,
    });
    // add Category
    Category.findOne({name: req.body.category})
            .then(category =>{
                if(category){
                    newTeam.category=category.name;
                }
                else{          
                        errors.category="Category not found"
                        return res.status(400).json(errors);
                }
            })
    if(!isEmpty(req.file)) {newTeam.logo=req.file.path}
    else{errors.content='No file uploaded';
    return res.status(400).json(errors)}
    Team.findOne({name: req.body.name})
            .then(team =>{
                if(team){
                    //Stop the upload and throw an error
                if(!isEmpty(req.file))
                fs.unlink(req.file.path, (err) => {
                    if (err) throw err;
                    console.log('file was deleted');
                    });
                errors.title="This team name is already in db"
                return res.status(400).json(errors);
                }
                else{
                    // new team not found in the db
                    newTeam.save()
                    .then(post=>res.json(post))
                    .catch(err => console.log(err)); 
                }
            })
            
     
    });
// @route GET api/teams
// @description show teams 
// @access Public
    router.get('/',(req,res)=>{
        Team.find()
            .then(teams=> {res.json(teams)})
            .catch(err => res.status(404).json({message: 'no teams found'}))
    });    
// @route GET api/teams/:id
// @description show teams by id
// @access Public
router.get('/:id',(req,res)=>{
    Team.findById(req.params.id)
        .then(teams=>res.json(teams))
        .catch(err=>res.status(404).json({message : 'no team with this id found'}))
})

// @route DELETE api/teams/:id
// @description delete team
// @access Private
 
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors = {};
    Team.findById(req.params.id)
        .then(team => {
                // Delete team from db
                team.remove()
                    .then(()=>{console.log('team removed')})})
        .catch(err=>res.status(404).json({message : 'no team with this id found'}))
    });

//@route POST /api/teams/follow/:id
//@description Follow a team
//@access  Private
router.post('/follow/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Team.findById(req.params.id)      
         .then(team=>{
          if(!team)
            {   console.log(req.params.id)
                return res.status(404).json({message: 'no team with this id to follow'})}
          else
          {
            if(req.user.interestList.filter(follow=>follow.entity==req.params.id).length>0){
            // get index to remove  
            console.log('hello',req.user.interestList)
            const removeIndex = req.user.interestList
            .map(followToRemove=>followToRemove.entity)
            .indexOf(req.params.id); 
            //remove from array
            req.user.interestList.splice(removeIndex,1);
            //Save
            req.user.save().then(user=>res.json(user.interestList));
            // decrement number of followers in team
            team.nbrFollowers-=1;
            team.save()
                .then(console.log("number of followers updated"))
                .catch(err => {console.log(err)})
            }     
            else {// Add user handle to subs array
            req.user.interestList.unshift({entity : team.id});
            req.user.save().then(user =>res.json(user.interestList));
            // increment number of followers in team
            team.nbrFollowers+=1;
            team.save()
                .then(console.log("number of followers updated"))
                .catch(err => {console.log(err)})
              }
          }
        })
        .catch(err=>{console.log(err);res.status(404).json({message: 'no team with this id to follow '})})
  });
module.exports = router;