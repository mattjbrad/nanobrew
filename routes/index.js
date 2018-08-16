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

router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    console.log(req.body);
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
           res.redirect("/brews"); 
        });
    });
});

router.get("/login", (req, res) => {
    res.render('login');
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/brews');
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/brews",
     failureRedirect:"/login"
    }), (req, res) => {
    
});

router.get("*", (req, res)=>{
    res.render("404");
});

isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    } 
    res.redirect('/login');
}

module.exports = router;