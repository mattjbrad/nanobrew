const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get("/", (req, res) => {
    res.render('index');
});

router.get("/index", (req, res) => {
    res.redirect('/');
});

router.get("/register", (req, res) => {  
    res.render('register');
});

// router.post("/register", (req, res) => {
//     const newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, (err, user) => {
//         if(err){
//             console.log(err);
//             req.flash('error', 'Sorry someone with that username already exists');
//             return res.redirect("/register");
//         }
//         passport.authenticate("local")(req, res, () => {
//             req.flash('success', 'You have now been registered');
//             res.redirect("/brews"); 
//         });
//     });
// });

router.get("/login", (req, res) => {
    res.render('login');
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash('success', 'Logged out successfully');
    res.redirect('/brews');
});

router.post("/login", passport.authenticate("local", {
        successRedirect: "/brews",
        failureRedirect:"/login", 
        failureFlash: 'Invalid username or password'
    })
);

router.get("*", (req, res)=>{
    res.render("404");
});

module.exports = router;