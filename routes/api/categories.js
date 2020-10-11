const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Category Model
const Category = require('../../models/Category')

// Load input Validation for registry and login
const validateCategoryInput = require('../../validations/category');

// @route POST api/categories
// @description Create Category
// @access Private 
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors , isValid} = validateCategoryInput(req.body);
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
    const newCategory=new Category({name:req.body.name, });
    Category.findOne({name: req.body.name})
            .then(category =>{
                if(category){errors.title="This Category name is already in db"
                return res.status(400).json(errors);
                }
                else{
                    // new Category not found in the db
                    newCategory.save()
                    .then(post=>res.json(post))
                    .catch(err => console.log(err)); 
                }
            })
    
});
// @route GET api/categories
// @description show categories 
// @access Public
router.get('/',(req,res)=>{
    Category.find()
        .then(categories=> {res.json(categories)})
        .catch(err => res.status(404).json({message: 'no categories found'}))
});    
// @route GET api/categories/:id
// @description show category by id
// @access Public
router.get('/:id',(req,res)=>{
Category.findById(req.params.id)
    .then(category=>res.json(category))
    .catch(err=>res.status(404).json({message : 'no Category with this id found'}))
})

// @route DELETE api/categories/:id
// @description delete Category
// @access Private

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
const errors = {};
Category.findById(req.params.id)
    .then(category => {
            // Delete Category from db
            category.remove()
                .then(()=>{console.log('category removed')})})
    .catch(err=>res.status(404).json({message : 'no Category with this id found'}))
});
module.exports = router;