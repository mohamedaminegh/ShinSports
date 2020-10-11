const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateMatchInput(data){
let errors = {};
data.category = !isEmpty(data.category) ? data.category : '';
data.competition = !isEmpty(data.competition) ? data.competition : '';
data.teamOne = !isEmpty(data.teamOne) ? data.teamOne : '';
data.teamTwo = !isEmpty(data.teamTwo) ? data.teamTwo : '';
data.startDate = !isEmpty(data.startDate) ? data.startDate : '';
data.startTime = !isEmpty(data.startTime) ? data.startTime : '';
data.stadium = !isEmpty(data.stadium) ? data.stadium : '';


if(Validator.isEmpty(data.category)){
        errors.category='Category field is required'
}

if(Validator.isEmpty(data.teamOne)){
        errors.teamOne='First team field is required'
}
if(Validator.isEmpty(data.teamTwo)){
    errors.teamTwo='Second team field is required'
}
if(Validator.isEmpty(data.startDate)){
    errors.startDate='Start date field is required'
}

if(Validator.isEmpty(data.startTime)){
    errors.startTime='Start Time field is required'
}
if(Validator.isEmpty(data.competition)){
    errors.competition='Competition field is required'
}
if(Validator.isEmpty(data.stadium)){
    errors.stadium='Stadium field is required'
}
return{
        errors,
        isValid: isEmpty(errors)
}
}