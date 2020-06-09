const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extende: true}));
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("landing");
});


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