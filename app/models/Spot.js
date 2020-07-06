const mongoose = require('mongoose');

const spotModel = new mongoose.Schema({
    id: { type: Number, index: true },
    name: String,
    image: String,
    description: String, 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }]
});


module.exports = mongoose.model('spots', spotModel);
