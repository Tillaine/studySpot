const   express = require("express"),
        router = express.Router(),
        Spot   = require("../models/Spot");
    
//middleware 
const isLoggedIn = (req, res, next) => {
    if( req.isAuthenticated() ) {
        return next();
    }
    res.redirect("/login");
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
    
//Spot Details 
    router.get("/:id", (req, res) => {
        Spot.findById(req.params.id).populate("comments").exec((err, spot) => {
            if (err) { console.log(err) }
            else { 
                res.render("spots/show", { spot })}
        })
    })

    module.exports = router;