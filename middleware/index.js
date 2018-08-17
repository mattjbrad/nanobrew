let Brew = require('../models/brew');

const middleware = {
    checkOwnership: (req, res, next) => {
        if(req.isAuthenticated()) {
            Brew.findById(req.params.id, (err, brew) => {
                if (err) {
                    console.log(err);
                    res.redirect('back');
                } else {
                    if(brew.creator.id.equals(req.user._id)){
                        next();
                    } else {
                        res.redirect('back');
                    }
                }
            });
        } else {
            console.log('You need to be logged in to do that');
            res.redirect('back');
        }
    },
    isLoggedIn: () => {
        if (req.isAuthenticated()){
            return next();
        } 
        res.redirect('/login');
    }
};

module.exports = middleware;