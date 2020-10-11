const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validatePlayerInput(data,file){
let errors = {};
data.name = !isEmpty(data.name) ? data.name : '';
data.category = !isEmpty(data.category) ? data.category : '';
data.weight = !isEmpty(data.weight) ? data.weight : '';
data.age = !isEmpty(data.age) ? data.age : '';
data.height = !isEmpty(data.height) ? data.height : '';
data.photo = !isEmpty(data.photo) ? data.photo : '';

if(!Validator.isLength(data.name,{min: 5 , max : 30})){
errors.name = 'Name must be between 5 and 30 characters';
}
if(Validator.isEmpty(data.name)){
    errors.name='Name field is required'
}
if(Validator.isEmpty(data.photo) && isEmpty(file)){
    errors.photo='Photo field is required';
}
if(!Validator.isNumeric(data.height)){
    errors.height='Height must be a number'
}
else{
    if(data.height<140 || data.height>220){
        errors.height='Height must be between 140 and 220'
    }
}
if(Validator.isEmpty(data.height)){
        errors.height='Height field is required'
    }
if(!Validator.isNumeric(data.age)){
        errors.age='Age must be a number'
    }
else{
        if(data.age<14 || data.age>50){
            errors.age='Age must be between 15 and 50'
        }
    }
if(Validator.isEmpty(data.age)){
            errors.age='Age field is required'
        }
if(!Validator.isNumeric(data.weight)){
        errors.weight='Weight must be a number'
    }
else{
        if(data.weight<50 || data.weight>200){
            errors.weight='weight must be between 50 and 200'
        }
    }
if(Validator.isEmpty(data.weight)){
        errors.weight='Weight field is required'
    }
/*if(Validator.isEmpty(data.category)){
        errors.category='Category field is required'
    }*/
return{
    errors,
    isValid: isEmpty(errors)
}
}