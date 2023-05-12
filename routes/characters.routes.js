const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get('/characters/create', async(req, res, next) =>{
    res.render('characters/create-character')
})

router.post('/characters/create', async(req, res, next) =>{
    try {
        if(req.body.debt === 'on'){
            req.body.debt = true
        } else{
            req.body.debt = false
        }
        console.log(req.body)
    const response = await axios.post("https://ih-crud-api.herokuapp.com/characters", {name: req.body.name, occupation: req.body.occupation, weapon: req.body.weapon, debt: req.body.debt})
    res.redirect('/characters')

    } catch (error) {
        console.log(error)
    }
    
})

router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.get('/characters/:id/edit', async(req, res, next) =>{
    const characterData = await axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    const updateChar = await axios.put("https://ih-crud-api.herokuapp.com/characters", {})
    res.render('characters/edit-character')
})

router.post('/characters/:id/edit', async(req, res, next) =>{
    
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters