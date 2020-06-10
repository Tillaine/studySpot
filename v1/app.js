const   express     = require('express'),
        app         = express(),
        port        = 3000,
        bodyParser  = require('body-parser'),
        mongoose    = require("mongoose");

// ****************************
//         Temp Data
        // ****************************
const spots = [
    {name: "Belmar Library", image: "https://cdn.pixabay.com/photo/2015/07/17/22/42/library-849797_1280.jpg"},
    {name: "Colfax Starbucks", image: "https://cdn.pixabay.com/photo/2017/08/06/04/09/people-2588594_1280.jpg"},
    {name: "Auraria Library", image: "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg"},
    {name: "Belmar Library", image: "https://cdn.pixabay.com/photo/2015/07/17/22/42/library-849797_1280.jpg"},
    {name: "Colfax Starbucks", image: "https://cdn.pixabay.com/photo/2017/08/06/04/09/people-2588594_1280.jpg"},
    {name: "Auraria Library", image: "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg"},
    {name: "Belmar Library", image: "https://cdn.pixabay.com/photo/2015/07/17/22/42/library-849797_1280.jpg"},
    {name: "Colfax Starbucks", image: "https://cdn.pixabay.com/photo/2017/08/06/04/09/people-2588594_1280.jpg"},
    {name: "Auraria Library", image: "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg"}
];

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
});



let Spot = mongoose.model('spots', spotModel);

const addManySpots = (spots) => {
    
    return new Promise((resolve, reject) => {
        Car.collection.insertMany(spots, (err, docs) => {
            if(err) { reject(err) }
            else {resolve (docs.length, 'added')}
        })

    })
}
addManySpots(spots)

const addSpot = (spot) => {
    
    let newSpot = new Spot(spot);
    return new Promise((resolve, reject) => {
         newSpot.save((err) => {
           if(err) {reject (err)}
           else { resolve (newCar) }
         })
    })
}

const getSpots = () => {
    return new Promise((resolve, reject) => {
    
        Spot.find((err, spot) => {
          if (err) {reject(err)}
          else {
            resolve(spot)
        }
      })
    })    

const deleteSpot = (id) => {
        return new Promise((resolve, reject) => {
          Spot.remove({_id: id}, (err, note) => {
            if(err) {reject(err)}
            else{resolve(note) }
          } )
        
        })
        }
        
}




   // ****************************
   //      Routes
    // ****************************
app.use(bodyParser.urlencoded({extende: true}));
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("landing");
});




app.get("/spots", (req, res) => {
 res.render('spots', { spots })
} )


app.post("/spots", (req, res) => {
    const name = req.body.name
    const image = req.body.image
    var newSpot = {name, image}
    spots.push(newSpot)
    res.redirect('/spots')
    //get data from 
})

app.get("/spots/new", (req, res) => {
    res.render('new.ejs')
});

app.listen(process.env.PORT || port, () => console.log(`server running on ${port}`))