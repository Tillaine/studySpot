const   express = require("express"),
        router = express.Router({mergeParams: true})
const   Spot   = require("../models/Spot"),
        Comment = require("../models/comment");

//middleware 
const   isLoggedIn = (req, res, next) => {
    if( req.isAuthenticated() ) {
        return next();
    }
    res.redirect("/login");
}

//comments new
router.get("/new", isLoggedIn, (req, res) => {
    Spot.findById(req.params.id, (err, spot) => {
        if ( err ) {console.log(err)}
        else {
            res.render("comments/new", { spot })
        }
    })
})
//comments add

router.post("/", isLoggedIn, (req, res) => {
    Spot.findById(req.params.id, (err, spot) => {
        if( err ) {res.send('Database error 🥺')}
        else {
            console.log(req.body.comment)
            Comment.create(req.body.comment, (err, comment) => {
                if ( err ) { console.log(err) }
                else {
                    spot.comments.push(comment);
                    spot.save()
                    res.redirect('/spots/' + spot._id);
                }
            })
        }
    })
})


module.exports = router;