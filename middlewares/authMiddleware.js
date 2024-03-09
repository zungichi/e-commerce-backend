const {User} = require('../models/users');

const isLogin = (req, res, next) => {
    if (req.isAuthenticated() === false){
        return res.status(401).json({ret:false,msg:'You has not logged in',data:null});
    }
    next();
}

module.exports = {isLogin};