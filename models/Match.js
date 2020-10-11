const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const MatchSchema = new Schema({
stadium: {
        type: String,
        required: true
},
competition: {
    type: String,
    required: true
},
startDate: {
    type: Date,
    required: true
},
startTime:{
    type:String,
    required: true
},
teamOne: {
    type: Schema.Types.ObjectId,
    ref:'entities',
    required: true,
},
teamTwo: {  
    type: Schema.Types.ObjectId,
    ref:'entities',
    required: true,
},
category: {
    type: String,
    required: true
  },
nbrFollowers: {
    type: Number,
    default: 0
},
});
module.exports = Match = mongoose.model('matches',MatchSchema);

