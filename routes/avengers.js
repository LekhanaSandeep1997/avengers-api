const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const Avenger = require('../models/avengerModel');
const router = express.Router();
const jwt = require("jsonwebtoken");

SECRET_KEY = "123456789"

let avengerArray = [
    { id: 1, name: "Captain America" },
    { id: 2, name: "Thor" },
    { id: 3, name: "Black Widow" },
]

router.get("/", async (req, res) => {
    // const token = req.header("x-jwt-token");

    // if(!token) return res.status(401).send("Access is denied. No token Found");

    // try{
    //     jwt.verify(token, SECRET_KEY)
    // }
    // catch(e){
    //     return res.status(400).send("Invalid Token");
    // }

    try {
        let avengers = await Avenger.find().sort({ name: "asc" });
        return res.send(avengers);
    } catch (ex) {
        return res.status(500).send("Error: " + ex.message);
    }

    //let avengers = ['Iron Man','Captain America', 'Thor'];
    //res.send(avengers);
    // console.log("GET Method Called...");
    // res.send(avengerArray);
});

router.get('/:avengerId', async (req, res) => {
    let avenger = await Avenger.findById(req.params.avengerId);
    if (!avenger) {
        return res.status(404).send("Page not Found (ID not found in system)");
    }
    res.status(200).send(avenger);



    // let avenger = avengerArray.find(a => a.id == req.params.avengerId);
    // if (!avenger) {
    //     return res.status(404).send("Page not Found (ID not found in system)");
    // }
    // res.status(200).send(avenger);
});


router.post('/', async (req, res) => {

    // if (!req.body.name) {
    //     return res.status(400).send("Not All mandotory values are sent");
    // }

    const token = req.header("x-jwt-token");

    if(!token) return res.status(401).send("Access is denied. No token Found");

    try{
        jwt.verify(token, SECRET_KEY)
    }
    catch(e){
        return res.status(400).send("Invalid Token");
    }

    try {

        let avenger = new Avenger({
            name: req.body.name,
            birthname: req.body.birthname,
            movies: req.body.movies,
            imgUrl: req.body.imgUrl,
            likeCount: req.body.likeCount,
            deceased: req.body.deceased
        });

        avenger = await avenger.save();
        res.send(avenger);

    } catch (ex) {
        return res.status(500).send("Error: " + ex.message);
    }



    // // Validation
    // if (!req.body.name) {
    //     return res.status(400).send("Not all mandotory values are sent");
    // }

    // let newAvengerObj = {
    //     id: avengerArray.length + 1,
    //     name: req.body.name
    // };
    // avengerArray.push(newAvengerObj);
    // res.send(newAvengerObj);
});


router.put('/:avengerId', async (req, res) => {
    
    let avenger = await Avenger.findById(req.params.avengerId);
    if (!avenger) {
        return res.status(404).send("Page not Found (ID not found in system)");
    }
    
    // if (!req.body.name) {
    //     return res.status(400).send("Not all mandotory values are sent");
    // }
    
    // Validation
    if (!req.body.likeCount) {
        return res.status(400).send("Not all mandatory values are sent");
    }

    avenger.set({ likeCount: req.body.likeCount });
    avenger = await avenger.save();
    avenger = await avenger.save();
    res.send(avenger);

    // avenger.name = req.body.name;

    //res.send(avenger);

    //avenger.set({name: req.body.name});

    //array
    // let avenger = avengerArray.find(a => a.id == req.params.avengerId);
    // if (!avenger) {
    //     return res.status(404).send("Page not Found (ID not found in system)");
    // }
    // // Validation
    // if (!req.body.name) {
    //     return res.status(400).send("Not all mandotory values are sent");
    // }
    // avenger.name = req.body.name;
    // res.send(avenger);
});

router.delete('/:avengerId', async (req, res) => {

    const token = req.header("x-jwt-token");

    if(!token) return res.status(401).send("Access is denied. No token Found");

    // checking whether valid and authenticated
    try{
        jwt.verify(token, SECRET_KEY)
    }
    catch(e){
        return res.status(400).send("Invalid Token");
    }

    let decoded = jwt.decode(token, SECRET_KEY);
    if(!decoded.isAdmin){
        return res.status(403).send("Forbidden. You dont have access to this endpoint");
    }

    let avenger = await Avenger.findByIdAndDelete({_id: req.params.avengerId})

    // let avenger = avengerArray.find(a => a.id == req.params.avengerId);

    if (!avenger) {
        return res.status(404).send("Page not Found (ID not found in system)");
    }
//
    // let indexOfAvenger = avengerArray.indexOf(avenger);
    // avengerArray.splice(indexOfAvenger, 1);

    res.send(avenger);
});

module.exports = router;