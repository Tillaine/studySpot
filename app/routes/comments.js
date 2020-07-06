const   express = require("express"),
        router = express.Router({mergeParams: true})
const   Spot   = require("../models/Spot"),
        Comment = require("../models/comment");

// ************************
//middleware 
// ************************
const   isLoggedIn = (req, res, next) => {
    if( req.isAuthenticated() ) {
        return next();
    }
    res.redirect("/login");
}

const checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log('id', req.params.comment_id)
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            console.log('comment', foundComment)
            if ( err ) { 
                console.log(err) 
                res.redirect('back')}
            else {
                if (foundComment.author.id.equals(req.user._id)) {
                   next();
                } else {
                    res.redirect('back')
                }
            }
        });
    } else {
        res.redirect('back')
    }
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

router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
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
    Comment.findByIdAndUpdate(req.params.comment_id, checkCommentOwnership, req.body.comment, (err, comment) => {
        if ( err ) {
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect("/spots/" + req.params.id);
        }
    })
})

// detele comment 

router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
    console.log('comment id', req.params.comment_id)
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if ( err ) {
            console.log(err)
            res.redirect("/spots/" + req.params.id);
        }
    })
});

module.exports = router;