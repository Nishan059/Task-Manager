const Users = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utils/hashPassword");
const createToken = require("../utils/createJWT");
const { default: mongoose } = require("mongoose");
const {authErrorHandler} = require("../utils/errorHandler");
const MAX_AGE = 60 * 60 * 24;


const get_user = async (req,res) => {
    const token = req.cookies.user_auth;
    console.log("Token: ", token);
    let user = null;
    try {
        if(token){
            jwt.verify(token, process.env.JWT_SECRECT_KEY, async (err, decoded) => {
                if(err){
                    res.status(401).json({status: "Not Authenticated", redirect: true})
                }
                else{
					user = await Users.findOne({_id: decoded.user_id});
					res.status(200).json({user:user, status: "Authenticated"})
                }
            })
        }
        else{
			res.status(401).json({status: "Not Authenticated", redirect: true})
		}
    } catch (error) {

        res.json({error})
        
    }
}

const create_user = async (req,res) => {
    let user_value = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "userName": req.body.userName,
        "password": req.body.password
    }
    try {
        user_value.password = await hashPassword(user_value.password);
        const User = await Users.create(user_value);
        // console.log(User)
        const token = createToken(User._id, MAX_AGE);
        res.cookie("user_auth", token, {httpOnly: true, maxAge: MAX_AGE * 1000});
        
        res.status(201).json({User})
    } catch (error) {
        let err = authErrorHandler(error)
        res.status(400).json({err})
    }
}
const authenticate_user = async (req,res) => {
    const username = req.body.userName;
    console.log(username)
    try {
        const User = await Users.findOne({userName: username});
        if(!User) return res.json({"error": "Username not registered", "type": "username"});

        const password = req.body.password;
        const validate = await bcrypt.compare(password, User.password);
        
        if(!validate) return res.json({"error": "Password didn't match","type": "password"})
        const token = createToken(User._id, MAX_AGE);

        res.cookie("user_auth", token, {httpOnly: true, maxAge: MAX_AGE * 1000});
		res.status(200).json({message: "Success", redirect: true})
        
        
    } catch (error) {
        res.json({error})
        
    }

}
const logout_user = async (req,res) => {
	res.cookie("user_auth", "",{max_age: 1});
	res.redirect("/")
}

// Exports 
module.exports = {
    get_user,
    create_user,
    authenticate_user,
    logout_user
}