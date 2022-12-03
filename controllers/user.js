/////////////////////////////
//   Import Dependencies   //
/////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

///////////////////////
//   Create Route   //
//////////////////////
const router = express.Router();

////////////////
//   Routes   //
////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})


router.post("/signup", async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    // create the new user
    User.create(req.body, (err, user) => {
        //redirect to login page
        res.redirect("/user/login")
    })
})

// router.post("/signup", (req, res) => {
//     res.send("signup")
// })

// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    // Gets the data from the requested body
    const {username, password } = req.body

    User.findOne({username}, (err, user) => {
        // Checks to see if the user exists
        if(!user) {
            res.send('user doesnt exist')
        } else {
            // checks to see if the password matches
            const result = bcrypt.compareSync(password, user.password)
            if(result) {
                // if true it redirects to fruits
                res.redirect('/fruits')
            } else {
                // if false says wrong password
                res.send('wrong password')
            }
        }
    })
})

///////////////////////////
//   Export the Router   //
///////////////////////////
module.exports = router;