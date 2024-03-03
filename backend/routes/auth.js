const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Happy$boxing"

// Create a User using POST "/api/auth/createuser". No login required
router.post('/createuser',[
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
    const salt =await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass
    })
    const data = {
        user:{
            id:user.id
        }
    }
    const authToken = jwd.sign(data, JWT_SECRET)

    // res.json({user})
    res.json({authToken})
}
    catch(error){
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})

// Authenticate a User using POST "/api/auth/login". No login required
router.post('/createuser',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
    
] , async(req,res)=>{
    const errors = validationResult(req);
    //if there are errors return bad req and errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body
    try{
        let user = User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const correctPassword = bcrypt.compare(password, user.password)
        if(!correctPassword)
        {
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
    }
    catch (error){

    }
})
module.exports = router