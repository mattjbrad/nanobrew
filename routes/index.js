const express = require('express');
const router = express.Router();
const User = require('../models/user');

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
//     const newUser = new User({email: req.body.email, password:req.body.password});
//     User.create(newUser).then((user) =)
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             req.flash("error", err.message);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//            req.flash("success", "Welcome to YelpCamp " + user.username);
//            res.redirect("/campgrounds"); 
//         });
//     });
//     res.redirect('/register');
// });

router.get("/login", (req, res) => {
    res.render('login');
});

router.post("/login", (req, res) => {
    res.send(`Logged in as ${req.body.email}`)
});

router.get("*", (req, res)=>{
    res.render("404");
});

module.exports = router;