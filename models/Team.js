const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const Entity = require('./Entity')
//Create Schema
const Team = Entity.discriminator('teams',new Schema({
name: {
    type: String,
    required: true
},
country: {
    type: String,
    required: true
},
league: {
    type: String,
    required: true
},
coach: {
    type: String,
    required: true
},
president: {
    type: String,
    required: true,
},
foundationDate: {
    type: Date,
},
logo: {
    type: String,
    default: 'public\\teams\\default.png',
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
}),
);
module.exports = mongoose.model('teams')