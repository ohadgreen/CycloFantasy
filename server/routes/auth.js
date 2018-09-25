const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
// const User = require('../model/User');

const User = mongoose.model("users");

module.exports = app => {    
    app.get('/api/auth/test', function (req, res) { res.send({ msg: 'User auth test!!!' })});

    app.post('/api/user', function (req, res) {
        const { username, password, nick, email } = req.body;
        user = new User({
            username: username,
            password: password,
            nickname: nick,
            email: email,
        });

        console.log("Server new user: " + user);
        // res.send({user: user});
        user.save(function (err) {
            if (err)
                res.send(err);
            else {
                return res.json({ data: user });
            }
        });
    });

    app.get("/api/auth/user", async (req, res) => {
        const { username, password } = req.query;
        console.log('username: ', username);        
        let errorMsg;
        const user = await User.findOne({ 'username': username });
        if(!user){
            errorMsg = 'user not found on db';
            console.log(errorMsg);            
            res.send({ error: errorMsg });
        }
        else { 
            if(user.password !== password){
                errorMsg = 'password mismatch';
                console.log(errorMsg);
                res.send({ error: errorMsg });
            }
            else{
                res.send({ user: user }); 
            }            
        }        
    })

    app.get("/api/auth/users", async (req, res) => {
        const users = await User.find({}).select('username -_id') //filter only usernames
        res.send(users);
    });
}