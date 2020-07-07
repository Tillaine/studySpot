const   express = require("express"),
        router = express.Router({mergeParams: true})
const   Spot   = require("../models/Spot"),
        Comment = require("../models/comment"),
        middleware = require('../middleware'); 

// ************************
//middleware 
// ************************

//comments new
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Spot.findById(req.params.id, (err, spot) => {
        if ( err ) {console.log(err)}
        else {
            res.render("comments/new", { spot })
        }
    })
})
//comments add

router.post("/", middleware.isLoggedIn, (req, res) => {
    Spot.findById(req.params.id, (err, spot) => {
        if( err ) {res.send('Database error 🥺')}
        else {
            console.log(req.body.comment)
            Comment.create(req.body.comment, (err, comment) => {
                if ( err ) { console.log(err) }
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    spot.comments.push(comment);
                    spot.save()
                    res.redirect('/spots/' + spot._id);
                }
            })
        }
    })
})

//edit comment 

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    const   spotID = req.params.id,
            commentID = req.params.comment_id;
    Comment.findById(commentID, (err, comment) => {
        if ( err ) {
            console.log(err)
            res.redirect('back')
        } else {
            res.render('../views/comments/edit', { spotID, comment });
             
        }
    })
    
})

//update comment 

router.put('/:comment_id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, middleware.checkCommentOwnership, req.body.comment, (err, comment) => {
        if ( err ) {
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect("/spots/" + req.params.id);
        }
    })
})

// detele comment 

router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    console.log('comment id', req.params.comment_id)
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if ( err ) {
            console.log(err)
            res.redirect("/spots/" + req.params.id);
        } else {
            res.redirect("/spots/" + req.params.id);
        }
    })
});

module.exports = router;