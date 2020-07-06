const   express = require("express"),
        router = express.Router(),
        passport = require("passport"),
        User     = require("../models/Users");

//middleware 
const isLoggedIn = (req, res, next) => {
    if( req.isAuthenticated() ) {
        return next();
    }
    res.redirect("/login");
}

// ****************************
//     Root Route
// ****************************

router.get("/", (req, res) => {
    res.render("landing");
});
    
    
// ****************************
//     Authentication Routes
// ****************************

//register form

router.get('/register', (req, res) => {
    res.render('register')
})

//handle sign up logic
router.post('/register', (req, res) =>  {
    const { username, password } = req.body;
    const newUser = new User({ username })
    User.register( newUser, password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/spots');
        })
    })
})

//show login
router.get('/login', (req, res) => {
    res.render('login')
})

//handle login
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/spots",
    failureRedirect: "/login"
}), function(req, res){
}); 

//logout 
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/spots');
})



module.exports = router;