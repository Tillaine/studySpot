const   Spot = require("../models/Spot"),
        middlewareObj = {};

middlewareObj.checkSpotOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Spot.findById(req.params.id, (err, foundSpot) => {
            if ( err ) { 
                console.log(err) 
                res.redirect('back')}
                else {
                    if (foundSpot.author.id.equals(req.user._id)) {
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
    
    middlewareObj.checkCommentOwnership = (req, res, next) => {
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
        
        middlewareObj.isLoggedIn = (req, res, next) => {
            if( req.isAuthenticated() ) {
                return next();
            }
            res.redirect("/login");
        }
        
        module.exports = middlewareObj;
        
        