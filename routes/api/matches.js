const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Category Model
const Match = require('../../models/Match')
const Team = require('../../models/Team')
const Entity = require('../../models/Entity')
const Category = require('../../models/Category')


// Load input Validation for registry and login
const validateMatchInput = require('../../validations/match');

// @route POST api/matches
// @description Create Match
// @access Private 

//TODO Test that the two entites are of the same type
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors , isValid} = validateMatchInput(req.body);
    if(!req.user.admin)
    {   
        //If user is not an admin deny creation
        errors.admin="User not allowed to create"
        return res.status(400).json(errors.admin);
    }
    if(!isValid)
    {     
        return res.status(400).json(errors);
    }
    const newMatch=new Match({
        stadium:req.body.stadium,
        competition:req.body.competition,
        startDate:req.body.startDate,
        startTime:req.body.startTime,
    });
    // Verifying Category
    Category.findOne({name: req.body.category})
    .then(category =>{
        if(category){
            newMatch.category=category.name;
            // Verifying first team
            Entity.findOne({name: req.body.teamOne})
            .then(team =>{
                if(team){
                    newMatch.teamOne=team.id;
                                // Verifying second team
                                Entity.findOne({name: req.body.teamTwo})
                                            .then(team =>{
                                                if(team){
                                                    newMatch.teamTwo=team.id;
                                                    newMatch.save()
                                                    .then(match=>res.json(match))
                                                    .catch(err => console.log(err)); 
                                                }
                                                else{
                                                    errors.teamTwo="the second team is not found"
                                                    return res.status(400).json(errors);
                                                }
                                            })
                        }
                else{
                    errors.teamOne="the first team is not found"
                    return res.status(400).json(errors);
                }
            })
        }
        else{          
                errors.category="Category not found"
                return res.status(400).json(errors);
        }
    })
    
    
   
});
// @route GET api/matches
// @description show matches 
// @access Public
router.get('/',(req,res)=>{
    Match.find()
        .populate('teamOne')
        .populate('teamTwo')
        .then(matches=> {res.json(matches)})
        .catch(err => res.status(404).json({message: 'no matches found'}))
});    
// @route GET api/matches
// @description show matches of specific team 
// @access Public
router.get('/team/:id',(req,res)=>{
    Match.find({$or: [{'teamOne': req.params.id},{'teamTwo': req.params.id}] })
        .populate('teamOne')
        .populate('teamTwo')
        .then(matches=> {res.json(matches)})
        .catch(err => res.status(404).json({message: 'no matches found'}))
});   
// @route GET api/matches/date
// @description get matches by category
// @access Public
router.get('/category/:name',(req,res)=>{
    Match.find({category: req.params.name})
       .sort({ startDate: -1})
       .populate('teamOne')
       .populate('teamTwo')
       .then(matches=> {res.json(matches)})
       .catch(err => res.status(404).json({message: 'no matches found'}))
   })

// @route GET api/matches/date
// @description get matches and sort by date
// @access Public
router.get('/date',(req,res)=>{
    Match.find()
       .sort({ startDate: 1})
       .populate('teamOne')
       .populate('teamTwo')
       .then(matches=> {res.json(matches)})
       .catch(err => res.status(404).json({message: 'no matches found'}))
   })

// @route GET api/matches/popular
// @description get matches and sort by popularity
// @access Public
router.get('/popular',(req,res)=>{
     Match.find()
        .sort({nbrFollowers: -1})
        .populate('teamOne')
        .populate('teamTwo')
        .then(matches=> {res.json(matches)})
        .catch(err => res.status(404).json({message: 'no matches found'}))
    })
// @route GET api/matches/:id
// @description show match by id
// @access Public
router.get('/:id',(req,res)=>{
    Match.findById(req.params.id)
        .populate('teamOne')
        .populate('teamTwo')
        .then(match=>res.json(match))
        .catch(err=>res.status(404).json({message : 'no match with this id found'}))
    })
// @route DELETE api/matches/:id
// @description delete Match
// @access Private

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
const errors = {};
Match.findById(req.params.id)
    .then(match => {
            // Delete Category from db
            match.remove()
                .then(()=>{console.log('match removed')})})
    .catch(err=>res.status(404).json({message : 'no Match with this id found'}))
});

//@route POST /api/matches/follow/:id
//@description Follow a match
//@access  Private
router.post('/follow/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Match.findById(req.params.id)      
         .then(match=>{
          if(!match)
            {   console.log(req.params.id)
                return res.status(404).json({message: 'no match with this id to follow'})}
          else
          {
            if(req.user.matchesFollowed.filter(follow=>follow.match==req.params.id).length>0){
            // get index to remove  
            const removeIndex = req.user.matchesFollowed
            .map(followToRemove=>followToRemove.match)
            .indexOf(req.params.id); 
            //remove from array
            req.user.matchesFollowed.splice(removeIndex,1);
            //Save
            req.user.save().then(user=>res.json(user));
            // decrement number of followers in match
            match.nbrFollowers-=1;
            match.save()
                .then(console.log("number of followers updated"))
                .catch(err => {console.log(err)})
            }     
            else {// Add user handle to subs array
            req.user.matchesFollowed.unshift({match : match.id});
            req.user.save().then(user =>res.json(user));
            // increment number of followers in match
            match.nbrFollowers+=1;
            match.save()
                .then(console.log("number of followers updated"))
                .catch(err => {console.log(err)})
              }
          }
        })
        .catch(err=>{console.log(err);res.status(404).json({message: 'no match with this id to follow '})})
  });
module.exports = router;