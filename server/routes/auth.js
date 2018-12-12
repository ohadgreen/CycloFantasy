const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const User = mongoose.model("users");

module.exports = app => {    
    app.get('/api/auth/test', function (req, res) { res.send({ msg: 'User auth test!!!' })});

    app.post('/api/auth/user', function (req, res) {
        const { username, password, nickname, email } = req.query;
        user = new User({
            username: username,
            password: password,
            nickname: nickname,
            email: email,
        });

        console.log("Server new user: " + user);
        user.save(function (err) {
            if (err)
                res.send({ text: err });
            else {
                return res.json({ data: user });
            }
        });
    });

    app.get("/api/auth/user", async (req, res) => {
        const { username, password } = req.query;
        // console.log('username: ', username);        
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
                user["token"] = "jwt-token";
                let authUser = {
                    id: user._id,
                    username: user.username,
                    password: user.password,
                    nickname: user.nickname,
                    email: user.email,
                    token: "jwt-token"
                }
                // console.log('user: ', authUser);                          
                res.send({ authUser }); 
            }            
        }        
    })

    app.get("/api/auth/users", async (req, res) => {
        const users = await User.find({}).select('username -_id') //filter only usernames
        res.send(users);
    });
}