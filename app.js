const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const req = require('express/lib/request');
const logger = require('./middleware/logger');
const authenticator = require('./middleware/authenticator');
const avengers = require('./routes/avengers');
const home = require('./routes/home');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express(); //create an express application
app.use(express.json());  // Parse json objects (middleware of express.json) telling app to use inbuit middleware

app.use(cors());
app.use(authenticator);
app.use(logger); //telling app to use the custom middleware logger
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use('/api/avengers', avengers);
app.use('/', home);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Listening on Port: " + PORT);
});

// Database Connection String
mongoose.connect("mongodb+srv://root:root@cluster0.ilevr.mongodb.net/avengersdb?retryWrites=true&w=majority", { useNewUrlParser: true})
    .then(
        () => {console.log("Connected to db Successfully.....")}
    )
    .catch(() => console.log("Error " + err));



    

//  Below have the previous exercises that we did (this is now partitions to routes)

// app.get("/", (req, res) => {
//     res.send("Hi Welcome");
// });

// let avengerArray = [
//     { id: 1, name: "Captain America" },
//     { id: 2, name: "Thor" },
//     { id: 3, name: "Black Widow" },
// ]


//callback function here is called a route handler
// app.get("/", (req, res) =>{
//     res.send("Hi Welcome");
// });

// app.get("/api/avengers", (req, res) =>{
//     //let avengers = ['Iron Man','Captain America', 'Thor'];
//     //res.send(avengers);
//     console.log("GET Method Called...");
//     res.send(avengerArray);
// });

// app.get('/api/avengers/1', (req, res) => {
//     let avengers = {name:'Iron Man', id: 1};
//     res.send(avengers);
// });


//GET with params
// app.get('/api/avengers/:avengerId', (req, res) => {
//     //using 'filterBy' user can filter something typing from url (http://localhost:3000/api/avengers/66000?filterBy=ironman)
//     let requestParam = req.query.filterBy;
//     res.send('You have requested for the Avenger Id ' + req.params.avengerId + ' filter By ' + requestParam);
// });



// ==       value only
// ===      value and the data type
// app.get('/api/avengers/:avengerId', (req, res) => {
//    let avenger = avengerArray.find(a=>a.id == req.params.avengerId);
//    if(!avenger){
//        return res.status(404).send("Page not Found (ID not found in system)");
//    }
//    res.status(200).send(avenger);
// });


// app.post('/api/avengers', (req,res) => {

//     // Validation
//     if(!req.body.name){
//         return res.status(400).send("Not all mandotory values are sent");
//     }

//     let newAvengerObj = {
//         id: avengerArray.length + 1,
//         name: req.body.name
//     };
//     avengerArray.push(newAvengerObj);
//     res.send(newAvengerObj);
// });


// app.put('/api/avengers/:avengerId', (req,res) => {
//     let avenger = avengerArray.find(a=>a.id == req.params.avengerId);

//     if(!avenger){
//         return res.status(404).send("Page not Found (ID not found in system)");
//     }

//     // Validation
//     if(!req.body.name){
//         return res.status(400).send("Not all mandotory values are sent");
//     }

//     avenger.name = req.body.name;
//     res.send(avenger);
// });

// app.delete('/api/avengers/:avengerId', (req,res) => {
//     let avenger = avengerArray.find(a=>a.id == req.params.avengerId);

//     if(!avenger){
//         return res.status(404).send("Page not Found (ID not found in system)");
//     }

//     let indexOfAvenger = avengerArray.indexOf(avenger);
//     avengerArray.splice(indexOfAvenger, 1);

//     res.send(avenger);
// })