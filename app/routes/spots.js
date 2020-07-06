const { findByIdAndUpdate } = require("../models/Spot");

const   express = require("express"),
        router = express.Router(),
        Spot   = require("../models/Spot");
// ***********************    
//middleware 
// ***********************    
const isLoggedIn = (req, res, next) => {
    if( req.isAuthenticated() ) {
        return next();
    }
    res.redirect("/login");
}

const checkSpotOwnership = (req, res, next) => {
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

//Spots
router.get("/", (req, res) => {
    Spot.find((err, spots) => {
        if (err) { console.log(err) }
        else {
            res.render('spots/index', { spots })
        }
    })
} )
    
//New Spot   
    router.post("/", isLoggedIn, (req, res) => {
        const { name, image, description } = req.body
        const author = {
            id: req.user._id,
            username: req.user.username
        }
        var newSpot = {name, image, description, author}
        Spot.create(newSpot, (err, freshSpot) => {
            if (err) { console.log(err) }
            else { console.log(freshSpot)}
            res.redirect('/spots')
        })
     
    })

    router.get("/new", isLoggedIn, (req, res) => {
        res.render('spots/new.ejs')
    });

//Edit Spot Form

router.get("/:id/edit",  checkSpotOwnership, (req, res) => {
        Spot.findById(req.params.id, (err, foundSpot) => {
            if ( err ) { 
                console.log(err) 
                res.redirect('/spots')}
            else {
                    res.render("spots/edit", { spot: foundSpot })
                } 
            })
        })
    


//update Spot
    
router.put("/:id",  checkSpotOwnership, ( req, res ) => {
    Spot.findByIdAndUpdate(req.params.id, req.body.spot, (err, updatedSpot) => {
        if( err ) { 
            console.log( err )
            res.redirect('/spots')
        }
        else {
            res.redirect('/spots/' + req.params.id)
        }
    })
})
//Spot Details 
    router.get("/:id", (req, res) => {
        Spot.findById(req.params.id).populate("comments").exec((err, spot) => {
            if (err) { console.log(err) }
            else { 
                res.render("spots/show", { spot })}
        })
    })

// Destroy Spot Route
router.delete('/:id',  checkSpotOwnership, (req, res) => {
    Spot.findByIdAndRemove(req.params.id, (err) => {
        if ( err ) {
            console.log(err)
            res.redirect('/spots')
        } else {
            res.redirect('/spots')
        }
    })
})

    module.exports = router;