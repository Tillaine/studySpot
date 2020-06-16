const   express     = require('express'),
        app         = express(),
        port        = 3000,
        bodyParser  = require('body-parser'),
        mongoose    = require("mongoose"),
        Spot        = require("./models/Spot");
        Comment = require("./models/comment")
        seedDB      = require("./seed") 

    //seed database/
    
    
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
                    res.render('spots/index', { spots })
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
            res.render('spots/new.ejs')
        });
        
        app.get("/spots/:id", (req, res) => {
            Spot.findById(req.params.id).populate("comments").exec((err, spot) => {
                if (err) { console.log(err) }
                else { 
                    res.render("spots/show", { spot })}
            })
        })

        app.get("/spots/:id/comments/new", (req, res) => {
            Spot.findById(req.params.id, (err, spot) => {
                if ( err ) {console.log(err)}
                else {
                    res.render("comments/new", { spot })
                }
            })
        })

        app.post("/spots/:id/comments", (req, res) => {
            Spot.findById(req.params.id, (err, spot) => {
                if( err ) {res.send('Database error 🥺')}
                else {
                    console.log(req.body.comment)
                    Comment.create(req.body.comment, (err, comment) => {
                        if ( err ) { console.log(err) }
                        else {
                            spot.comments.push(comment);
                            spot.save()
                            res.redirect('/spots/' + spot._id);
                        }
                    })
                }
            })
        })




        app.listen(process.env.PORT || port, () => console.log(`server running on ${port}`))
       
       
       
        