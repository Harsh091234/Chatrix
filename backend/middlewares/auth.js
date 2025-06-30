
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");


const protect = async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            // console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            let user = await userModel.findById(decoded.id).select("-password");
           
            req.user = user;
         next();
        } catch (error) {
            return res.status(401).json({message: "Not authorized, token failed"});
        }
    } else {
        return res.status(401).json({message: "Not authorized, no token"});
    }
}

module.exports = {protect};