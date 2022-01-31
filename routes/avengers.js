const express = require('express');
const router = express.Router();


let avengerArray = [
    { id: 1, name: "Captain America" },
    { id: 2, name: "Thor" },
    { id: 3, name: "Black Widow" },
]

router.get("/", (req, res) => {
    //let avengers = ['Iron Man','Captain America', 'Thor'];
    //res.send(avengers);
    console.log("GET Method Called...");
    res.send(avengerArray);
});

router.get('/:avengerId', (req, res) => {
    let avenger = avengerArray.find(a => a.id == req.params.avengerId);
    if (!avenger) {
        return res.status(404).send("Page not Found (ID not found in system)");
    }
    res.status(200).send(avenger);
});


router.post('/', (req, res) => {

    // Validation
    if (!req.body.name) {
        return res.status(400).send("Not all mandotory values are sent");
    }

    let newAvengerObj = {
        id: avengerArray.length + 1,
        name: req.body.name
    };
    avengerArray.push(newAvengerObj);
    res.send(newAvengerObj);
});


router.put('/:avengerId', (req, res) => {
    let avenger = avengerArray.find(a => a.id == req.params.avengerId);

    if (!avenger) {
        return res.status(404).send("Page not Found (ID not found in system)");
    }

    // Validation
    if (!req.body.name) {
        return res.status(400).send("Not all mandotory values are sent");
    }

    avenger.name = req.body.name;
    res.send(avenger);
});

router.delete('/:avengerId', (req, res) => {
    let avenger = avengerArray.find(a => a.id == req.params.avengerId);

    if (!avenger) {
        return res.status(404).send("Page not Found (ID not found in system)");
    }

    let indexOfAvenger = avengerArray.indexOf(avenger);
    avengerArray.splice(indexOfAvenger, 1);

    res.send(avenger);
});

module.exports = router;