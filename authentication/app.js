const users = require("./models/users");

const    express  = require("express"),
         passport = require("passport"),
         bodyParser = require("body-parser"),
         mongoose = require("mongoose"),
         LocalStrategy = require("passport-local"),
         passpostLocalMongoose = require("passport-local-mongoose"),
         User = require("./models/users.js"),
         app = express();




mongoose.connect('mongodb://localhost:27017/secret', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

app.use(require("express-session")({
    secret: "do you want to win capitalism?",
    resave: false, 
    saveUninitialized: false
}));
// ***********************
// Middleware
// ************************
app.set('view engine', 'ejs')
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// auth 
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}


// ***********************
// Routes
// ************************

app.get('/', (req, res) => {
    res.render('home')
})

//register Routes 
app.get('/register', (req, res) => {
    res.render("register");
})

app.post('/register', (req, res) => {
    const { username, password} = req.body
    User.register(new User({ username }), password, (err, user) => {
        if( err ) { 
            console.log(err) 
            return res.render('register');
        }
        passport.authenticate("local")(req, res, () => {
            res.render('secret')
        })
    })
})

// login Routes

app.get("/login", (req, res) => {
    res.render("login")
})

// /logout
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/')
})


app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login" 
}) ,(req, res) => {

})

app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret')
})



app.listen(process.env.Post || 3000, () => console.log('server started'))