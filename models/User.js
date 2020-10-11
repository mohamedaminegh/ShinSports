const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
username: {
    type: String,
    require: true
},
email: {
    type: String,
    required: true,
},
password: {
    type: String,
    required: true,
},
avatar: {
    type: String,
    default: 'public\\avatars\\default.png'
},
admin: {
    type: Boolean,
    default: false,
},
interestList: [
    {
        entity: {
            type: Schema.Types.ObjectId,
            ref:'entities',
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }

],
matchesFollowed: [
    {
        match: {
            type: Schema.Types.ObjectId,
            ref:'matches',
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }

],
});

module.exports = User = mongoose.model('users',UserSchema);

