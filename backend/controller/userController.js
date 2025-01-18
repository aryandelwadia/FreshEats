const express = require('express');
const app = express();
const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
// const path = require('path');
// const crypto = require('crypto');
const upload = require('../config/multerConfig');

app.use(cors());
app.use(cookieParser());

const jwt_key = process.env.JWT_KEY;

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       crypto.randomBytes(12, function(err, name){
//         const fn = name.toString("hex") + path.extname(file.originalname);
//         cb(null, fn);
//       });
//     }
//   });
  
// const upload = multer({ storage: storage })


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

module.exports.loginUser = async function loginUser(req, res){
    try{
        const data = req.body;
        let user = await userModel.findOne({email: data.email});
        
        if(user){
            const match = await bcrypt.compare(data.password, user.password);
            if(match){
                loggedUser = user;
                let uid = user['_id'];
                let token = jwt.sign({payload: uid}, jwt_key);
                res.cookie("loggedin", token, {sameSite: "None", secure: true, httpOnly: false, withCredentials: true }).status(200).json({
                    message: "Logged in successfully",
                });
            }
            else{
                res.status(401).json({
                    message: "wrong credentials"
                })
                return false;
            }
        }
        else{
            res.status(404).json({
                message: "user not found"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
};

module.exports.currentUser = async function currentUser(req, res){
    try {
        let token = req.cookies.loggedin;
        let payload = jwt.verify(token, jwt_key);
        const uid = payload.payload;
        const user = await userModel.findById(uid);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ 
                message: "user not found" 
            });
        }
        return true;

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
        return false;
    }
};

module.exports.signupUser = async function signupUser(req, res){
    try{
        const data = req.body;
        
        {
            let user = await userModel.create(data);
            res.status(200).json({
                message: 'user signed up'
            });
        }
        
    }
    catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
};

module.exports.logoutUser = async function logoutUser(req, res){
    try{
        res.cookie('loggedin', '', {maxAge: 1, withCredentials: true});
        res.status(200).json({
            message: "user logged out successfully",
        });
    }
    catch(err){
        res.status(404).json({
            message: err.message
        });
    }
};

module.exports.protectRoute = async function protectRoute(req, res, next){
    try{   
        if(req.cookies.loggedin){
            let isverified = jwt.verify(req.cookies.loggedin,jwt_key);
            if(isverified){
                next();
            }
            else{
                res.status(401).json({
                    message: "user not verified"
                });
            }
        }
        else{
            res.status(401).json({
                message: 'User Not Logged In'
            });
        }
    }
    catch(err){
        res.status(404).json({
            message: err.message
        })
    }
};

module.exports.userProfilePic = async function userProfilePic(req, res){
    try{
        const token = req.cookies.loggedin;
        if(!token){
            return res.status(401).json({
                message: "Please Login",
            });
        }
        const payload = jwt.verify(token, jwt_key);
        const uid = payload.payload;
        
        
        upload.single("image")(req, res, async function(err){
            if(err){
                return res.status(400).json({
                    message: err.message
                });
            }

            const data = req.body;
            let user = await userModel.findOneAndUpdate({_id: uid}, {profilePic: req.file.filename}, {new: true});
            res.status(200).json({
                message: "File Uploaded Successfully",
            })
        });
    }
    catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}