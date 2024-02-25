const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


// Create a User using POST "/api/auth/". Doesn't require auth
router.post('/',[
    body('name','Enter a valid Name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Incorrect password').isLength({min:5})
] , async(req,res)=>{

    const errors = validationResult(req);
    //if there are errors return bad req and errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check wether the email exist already
    try{
    let user =await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({error:"Sorry the user with this email already exist "})
    }
    //Create a new user
    user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
    })
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:'Please enter a unique email',message: err.message})})
    res.json({user})
}
    catch(error){
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})

module.exports = router