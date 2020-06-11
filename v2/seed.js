var mongoose = require("mongoose");
var Spot = require("./models/Spot");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "History museum", 
        image: "https://cdn.pixabay.com/photo/2014/11/03/17/58/read-515531_1280.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Botanic Gardens Cafe", 
        image: "https://cdn.pixabay.com/photo/2015/07/19/10/00/still-life-851328_1280.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Butterfly Pavillion", 
        image: "https://cdn.pixabay.com/photo/2016/06/01/06/26/open-book-1428428_1280.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }, 
    {
        name: "Belmar Library", 
        description: "Great place to focus. Chill vibe, lots of seating and fresh coffee",  
        image: "https://cdn.pixabay.com/photo/2015/07/17/22/42/library-849797_1280.jpg"},
    {
        name: "Colfax Starbucks", 
        description: "Great place to focus. Chill vibe, lots of seating and fresh coffee", 
        image: "https://cdn.pixabay.com/photo/2017/08/06/04/09/people-2588594_1280.jpg"},
    {
        name: "Auraria Library", 
        description: "Great place to focus. Chill vibe, lots of seating and fresh coffee", 
        image: "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg"}
]
 
function seedDB(){
   //Remove all campgrounds
   Spot.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Spots!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few Spots
            data.forEach(function(seed){
                Spot.create(seed, function(err, spot){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a Spot");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but internet is spoty",
                                author: "Bit"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    spot.comments.push(comment);
                                    spot.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;

// ****************************
        //         Temp Data
                // ****************************
        // const spots = [
        //     {name: "Belmar Library", description: "Great place to focus. Chill vibe, lots of seating and fresh coffee",  image: "https://cdn.pixabay.com/photo/2015/07/17/22/42/library-849797_1280.jpg"},
        //     {name: "Colfax Starbucks", description: "Great place to focus. Chill vibe, lots of seating and fresh coffee", image: "https://cdn.pixabay.com/photo/2017/08/06/04/09/people-2588594_1280.jpg"},
        //     {name: "Auraria Library", description: "Great place to focus. Chill vibe, lots of seating and fresh coffee", image: "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg"}
        // ];
    // 