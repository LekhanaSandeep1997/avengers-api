const express = require('express');
const req = require('express/lib/request');

const app = express(); //create an express application

app.listen(3000, ()=>{
    console.log("Listening is started on Port 3000");
});

//callback function here is called a route handler
app.get("/", (req, res) =>{
    res.send("Hi Welcome");
});

app.get("/api/avengers", (req, res) =>{
    let avengers = ['Iron Man','Captain America', 'Thor'];
    res.send(avengers);
});

// app.get('/api/avengers/1', (req, res) => {
//     let avengers = {name:'Iron Man', id: 1};
//     res.send(avengers);
// });


//GET with params
app.get('/api/avengers/:avengerId', (req, res) => {
    //using 'filterBy' user can filter something typing from url (http://localhost:3000/api/avengers/66000?filterBy=ironman)
    let requestParam = req.query.filterBy;
    res.send('You have requested for the Avenger Id ' + req.params.avengerId + ' filter By ' + requestParam);
});