const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const Entity = require('./Entity')
//Create Schema
const Player = Entity.discriminator('players',new Schema({
name: {
        type: String,
        required: true
},
country: {
    type: String,
    required: true
},
age: {
    type: Number,
    required: true
},
weight: {
    type: Number,
    required: true,
},
height: {
    type: Number,
    required: true,
},
photo: {
    type: String,
    default: 'public\\players\\default.png',
    required: true,
},
careerStart: {
    type: Date,
},
birthDate: {
    type: Date,
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
module.exports = mongoose.model('players')

