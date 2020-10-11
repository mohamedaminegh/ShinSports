const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateTeamInput(data,file){
let errors = {};
data.name = !isEmpty(data.name) ? data.name : '';
data.category = !isEmpty(data.category) ? data.category : '';
data.league = !isEmpty(data.league) ? data.league : '';
data.country = !isEmpty(data.country) ? data.country : '';
data.coach = !isEmpty(data.coach) ? data.coach : '';
data.president = !isEmpty(data.president) ? data.president : '';
data.logo = !isEmpty(data.logo) ? data.logo : '';

if(!Validator.isLength(data.name,{min: 5 , max : 30})){
errors.name = 'Name must be between 5 and 30 characters';
}
if(Validator.isEmpty(data.name)){
    errors.name='Name field is required'
}
if(Validator.isEmpty(data.logo) && isEmpty(file)){
    errors.logo='Logo field is required';
}
if(!Validator.isLength(data.president,{min: 5 , max : 50})){
    errors.president = 'President field must be between 5 and 50 characters';
    }
if(Validator.isEmpty(data.president)){
        errors.president='President field is required'
    }
if(!Validator.isLength(data.coach,{min: 5 , max : 50})){
    errors.coach = 'Coach field must be between 5 and 50 characters';
    }
if(Validator.isEmpty(data.coach)){
        errors.coach='Coach field is required'
    }
if(Validator.isEmpty(data.category)){
    errors.category='Category field is required'
}
if(Validator.isEmpty(data.league)){
    errors.league='League field is required'
}
if(Validator.isEmpty(data.country)){
    errors.country='Country field is required'
}
return{
    errors,
    isValid: isEmpty(errors)
}
}