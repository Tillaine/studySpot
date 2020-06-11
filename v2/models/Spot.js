const mongoose = require('mongoose');

const spotModel = new mongoose.Schema({
    id: { type: Number, index: true },
    name: String,
    image: String,
    description: String, 
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }]
});


module.exports = mongoose.model('spots', spotModel);
