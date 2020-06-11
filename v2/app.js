const   express     = require('express'),
        app         = express(),
        port        = 3000,
        bodyParser  = require('body-parser'),
        mongoose    = require("mongoose"),
        Spot        = require("./models/Spot");
        seedDB      = require("./seed") 

    //seed database
    
    
    // ****************************
    //          Database Connection 
    // ****************************
    mongoose.connect('mongodb://localhost:27017/spots', { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    mongoose.set('useFindAndModify', false)
    // seedDB();
    
    
    
        // ****************************
        //      Routes
        // ****************************
        app.use(bodyParser.urlencoded({extende: true}));
        app.set("view engine", "ejs")
        
        app.get("/", (req, res) => {
            res.render("landing");
        });
        
        
        
        
        app.get("/spots", (req, res) => {
            Spot.find((err, spots) => {
                if (err) { console.log(err) }
                else {
                    res.render('index', { spots })
                }
            })
        } )
        
        
        app.post("/spots", (req, res) => {
            const { name, image, description } = req.body
            var newSpot = {name, image, description}
            Spot.create(newSpot, (err, freshSpot) => {
                if (err) { console.log(err) }
                else { console.log(freshSpot)}
                res.redirect('/spots')
            })
         
        })
        
        app.get("/spots/new", (req, res) => {
            res.render('new.ejs')
        });
        
        app.get("/spots/:id", (req, res) => {
            Spot.findById(req.params.id).populate("comments").exec((err, spot) => {
                if (err) { console.log(err) }
                else { 
                    res.render("show", {spot})}
            })
        })


        app.listen(process.env.PORT || port, () => console.log(`server running on ${port}`))
       
       
       
        