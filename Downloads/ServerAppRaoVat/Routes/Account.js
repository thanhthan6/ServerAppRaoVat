const User = require("../Models/User");
const Token = require("../Models/Token");

// Bcryptjs
var bcrypt = require('bcryptjs');

// JWT
var jwt = require("jsonwebtoken");
var privateKey = "123";

module.exports = function(app){
    
    app.post("/register", function(req, res){
        console.log("Post register");
        console.log( req.body );
        // Check avaible Username/Email
        User.find({
            "$or": [{"Username":req.body.Username}, {"Email":req.body.Email}]
        }, function(err, data){
            if(data.length==0){

                //Ma hoa password voi Bcryptjs
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.Password, salt, function(err, hash) {
                        if(err){
                            res.json({"kq":0, "errMsg":"Password encode error!"});
                        }else{
                            // Save user to Mongo Server
                            var newUser = User({
                                Username:   req.body.Username,
                                Password:   hash,
                                Name    :   req.body.Name,
                                Image   :   req.body.Image,
                                Email   :   req.body.Email,
                                Address :   req.body.Address,
                             PhoneNumber:    req.body.PhoneNumber,
                                Active: true,
                                RegisterDate: Date.now()
                            });

                            newUser.save(function(err){
                                if(err){
                                    res.json({"kq":0, "errMsg":"Mongo save user error"});
                                }else{
                                    res.json({"kq":1, "errMsg":"User register successfully."});
                                }
                            });

                        }
                    });
                });

            }else{
                res.json({"kq":0, "errMsg":"Email/Username is not availble."});
            }
        });
    });

    app.post("/login", function(req, res){
        // kichi 123
        // check Username co ton tai
        User.findOne({Username:req.body.Username}, function(err, data){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                if(!data){
                    res.json({kq:0, errMsg:"Username chưa đăng ký"});
                }else{
                    // Check Password
                    bcrypt.compare(req.body.Password, data.Password, function(err, resUser){
                        if(err){
                            res.json({kq:0, errMsg:err});
                        }else{
                            if(resUser===true){
                                //Login thanh cong
                                jwt.sign({
                                    IdUser: data._id,
                                    Username: data.Username,
                                    Name: data.Name,
                                    Image: data.Image,
                                    Address: data.Address,
                                    PhoneNumber: data.PhoneNumber,
                                    Active: data.Active, 
                                    RegisterDate: Date.now()
                                }, privateKey, {expiresIn:Math.floor(Date.now()/1000)+60*60*24*30*3}, function(err, token){
                                    if(err){
                                        res.json({kq:0, errMsg:err});
                                    }else{
                                        // Save Tokens
                                        var currenToken = new Token({
                                            Token: token,
                                            User: data._id,
                                            RegisterDate: Date.now(),
                                            State: true
                                        });

                                        currenToken.save(function(err){
                                            if(err){
                                                res.json({kq:0, errMsg:err});
                                            }else{
                                                res.json({kq:1, Token:token});
                                            }
                                        });
                                    }
                                });

                            }else{
                                res.json({kq:0, errMsg:"Sai password."});
                            }
                        }
                    });

                }
            }
        });

    });

    app.post("/verifyToken", function(req, res){
        Token.findOne({Token:req.body.Token, State:true}).select("_id").lean().then(result=>{
            if(!result){
                res.json({kq:0, errMsg:"Error Token"});
            }else{
                jwt.verify(req.body.Token, privateKey, function(err, decoded) {
                    if(!err && decoded !== undefined ){
                        res.json({kq:1, User:decoded});
                    }else{
                        res.json({kq:0, errMsg:"Token lỗi."});
                    }
                });
            }
        });    
    });

    app.post("/logout", function(req, res){
        Token.updateOne({Token:req.body.Token},{State:false}, function(err){
            if(err){
                res.json({kq:0, errMsg:"Logout error."});
            }else{
                res.json({kq:1, errMsg:"Logout successfully."});
            }
        });
    });

}