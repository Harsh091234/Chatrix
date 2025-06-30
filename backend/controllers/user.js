const userModel = require("../models/user");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const registerUserController = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  let user = await userModel.findOne({ email });
  if (user) return res.status(400).json({ message: "User already exists" });
  else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user = await userModel.create({
        name,
        email,
        password: hash,
        pic,
      });
      if (user)
        res.status(201).json({
          name,
          email,
          userId: user._id,
          
          token: generateToken(user._id),
        });
      else res.status(400).json({ message: "Failed to create user" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

const authUserController = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const user = await userModel.findOne({email});
  if(!user) return res.status(400).json({ message: "Invalid Credentials" });
  else{
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: "Invalid credentials"})
    }
    else{
      return res.status(200).json({
        id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id),
      
      })
    }
  }

};

const allUsersController = async (req, res) => {
  const search = req.query.search;

  const keyword = search
    ? {
        name: { $regex: `^${search}`, $options: "i" }, // starts with 'search' (case-insensitive)
      }
    : {};

  const users = await userModel
    .find({ ...keyword, _id: { $ne: req.user._id } }) // ✅ merge into one
    .select("-password");
    
  res.send(users);
}
module.exports = {
  registerUserController,
  authUserController,
  allUsersController
};
