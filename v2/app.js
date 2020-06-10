const   express     = require('express'),
        app         = express(),
        port        = 3000,
        bodyParser  = require('body-parser'),
        mongoose    = require("mongoose");

        
        // ****************************
        //          Database Connection 
        // ****************************
        mongoose.connect('mongodb://localhost:27017/spots', { poolSize: 100 });
        const connection = mongoose.connection;
        mongoose.set('useFindAndModify', false)
        
        let spotModel = new mongoose.Schema({
            id: { type: Number, index: true },
            name: String,
            image: String,
            description: String
        });
        
        
        let Spot = mongoose.model('spots', spotModel);
        
        
        // ****************************
        //      Routes
        // ****************************
        app.use(bodyParser.urlencoded({extende: true}));
        app.set("view engine", "ejs")
        
        app.get("/", (req, res) => {
            res.render("landing");
        });
        
        
        
        
        app.get("/index", (req, res) => {
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
                res.redirect('/index')
            })
            //get data from 
        })
        
        app.get("/spots/new", (req, res) => {
            res.render('new.ejs')
        });
        
        app.get("/spots/:id", (req, res) => {
            Spot.findById(req.params.id, (err, spot) => {
                if (err) { console.log(err) }
                else { 
                    res.render("show", {spot})}
            })
            //find spot with id 
            //show details 
            
        })



        app.listen(process.env.PORT || port, () => console.log(`server running on ${port}`))
       
       
       
        // ****************************
        //         Temp Data
                // ****************************
        // const spots = [
        //     {name: "Belmar Library", description: "Great place to focus. Chill vibe, lots of seating and fresh coffee",  image: "https://cdn.pixabay.com/photo/2015/07/17/22/42/library-849797_1280.jpg"},
        //     {name: "Colfax Starbucks", description: "Great place to focus. Chill vibe, lots of seating and fresh coffee", image: "https://cdn.pixabay.com/photo/2017/08/06/04/09/people-2588594_1280.jpg"},
        //     {name: "Auraria Library", description: "Great place to focus. Chill vibe, lots of seating and fresh coffee", image: "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg"}
        // ];
    // 