const { findByIdAndUpdate } = require("../models/Spot");
const middlewareObj = require("../middleware");

const   express = require("express"),
        router = express.Router(),
        Spot   = require("../models/Spot"),
        middleware = require('../middleware'); 

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
    router.post("/", middleware.isLoggedIn, (req, res) => {
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

    router.get("/new", middleware.isLoggedIn, (req, res) => {
        res.render('spots/new.ejs')
    });

//Edit Spot Form

router.get("/:id/edit", middleware.checkSpotOwnership, (req, res) => {
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
    
router.put("/:id", middleware.checkSpotOwnership, ( req, res ) => {
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
router.delete('/:id', middleware.checkSpotOwnership, (req, res) => {
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