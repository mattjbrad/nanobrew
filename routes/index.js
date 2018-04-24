const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.render('index');
});

router.get("/index", (req, res)=>{
    res.redirect('/');
});

router.get("*", (req, res)=>{
    res.send("404");
});

module.exports = router;