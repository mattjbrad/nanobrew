const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.redirect('/index.html');
});

router.get("/index", (req, res)=>{
    res.redirect('/index.html');
});

router.get("*", (req, res)=>{
    res.send("404");
});

module.exports = router;