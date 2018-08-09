const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index');
});

router.get("/index", (req, res) => {
    res.redirect('/');
});

router.get("/register", (req, res) =>{ 
    res.render('register');
});

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