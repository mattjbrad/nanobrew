let Brew = require('../models/brew');

const middleware = {
    checkOwnership: (req, res, next) => {
        if(req.isAuthenticated()) {
            Brew.findById(req.params.id, (err, brew) => {
                if (err) {
                    console.log(err);
                    req.flash('error', 'We could not find the brew');
                    res.redirect('back');
                } else {
                    if(brew.creator.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash('error', 'You need to be the owner of the brew to do that');
                        res.redirect('back');
                    }
                }
            });
        } else {
            req.flash('error', 'You need to be logged in to do that');
            res.redirect('back');
        }
    },
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'You need to log in to do that first!');
        res.redirect('/login');
    }
};

module.exports = middleware;