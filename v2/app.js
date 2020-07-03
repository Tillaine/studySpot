const   express     = require('express'),
        app         = express(),
        port        = 3000,
        bodyParser  = require('body-parser'),
        mongoose    = require("mongoose"),
        Spot        = require("./models/Spot");
        passport    = require("passport"),
        LocalStrategy = require("passport-local"),
        Comment     = require("./models/comment"),
        seedDB      = require("./seed"), 
        User        = require("./models/Users");
// routes 
const   commentRoutes = require("./routes/comments"), 
        spotRoutes = require("./routes/spots"), 
        authRoutes = require("./routes/index");


    // ****************************
    // Passport (Authentication) Configuration 
    // ****************************
   app.use(require("express-session")({
       secret: 'do you want to win at capitalism?',
       resave: false,
       saveUninitialized: false
   }));

   app.use(passport.initialize());
   app.use(passport.session());
   passport.use(new LocalStrategy(User.authenticate()));
   passport.serializeUser(User.serializeUser());
   passport.deserializeUser(User.deserializeUser());
    
    // ****************************
    //          Database Connection 
    // ****************************
    mongoose.connect('mongodb://localhost:27017/spots', { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    mongoose.set('useFindAndModify', false)
    // seedDB();
    

    // ****************************
    //      Middleware
    // ****************************
    app.use(bodyParser.urlencoded({extende: true}));
    app.set("view engine", "ejs");
    app.use(express.static('public'))
    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    })
    const isLoggedIn = (req, res, next) => {
        if( req.isAuthenticated() ) {
            return next();
        }
        res.redirect("/login");
    }

    // ****************************
    //      Routes
    // ****************************

    app.use("/", authRoutes);
    app.use("/spots/:id/comments", commentRoutes);
    app.use("/spots", spotRoutes);
    
    
        
        
    

        app.listen(process.env.PORT || port, () => console.log(`server running on ${port}`))
       
       
       
        