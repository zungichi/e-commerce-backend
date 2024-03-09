const passport = require('passport');
const {User} = require('../models/users');

const registerUser = async (req, res) => {
    const {firstname, lastname, username, password} = req.body;
    const user = new User({
        firstname: firstname,
        lastname: lastname,
        username: username
    });
    User.register(user, password).then(
        (user) => {
            const data = {
                _id: user._id,
                firstname:user.firstname,
                lastname:user.lastname,
                username:user.username
            }
            res.json({ret:true, msg:'Register User Success', data:data})
        }
    ).catch(err => {
        res.status(500).json({ret:false, msg:err.message, data:err})
    });
}

const login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err){
            return res.status(500).json({ret:false, msg:err.message, data:err});
        }
        if (!user){
            return res.status(500).json({ret:false, msg:'Username or password not correct', data:null});
        }
        
        req.login(user, (err) => {
            if (err){
                return res.status(500).json({ret:false, msg:err.message, data:err});
            }
            const data = {
                _id: user._id,
                firstname:user.firstname,
                lastname:user.lastname,
                username:user.username
            }
            return res.json({ret:true, msg:"Login Success", data:data});
        });
    })(req, res);
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err){
            return res.status(500).json({ret:false, msg:err.message, data:err});
        }
        return res.json({ret:true, msg:"Logout Success", data:null});
    });
}

const getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        return res.json({ret:true, msg:'Get user success', data:user});
    }
    catch (err){
        return res.status(500).json({ret:false, msg:err.message, data:err});
    }
}

module.exports = {registerUser, login, logout, getUserInfo};