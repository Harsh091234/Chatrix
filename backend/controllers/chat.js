const mongoose = require("mongoose");
const Chat = require("../models/chat");
const User = require("../models/user");

const accessChatsController = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};
const fetchChatsController = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const createGroupChatController = async(req, res) => {
  if(!req.body.name || !req.body.users) return res.status(400).send("Fill all the fields required");

  const users  = JSON.parse(req.body.users);

  if(users.length < 2) return res.status(400).send("More than two people are required");

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user
    });

    const fullGroupChat = await Chat.findOne({_id: groupChat._id})
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
      res.status(400);
      throw new Error(error.message);
  } 
};

const renameGroupController = async(req, res) => {
 
  const {chatId, chatName} = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {chatName},
    {new: true}
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  if(!updatedChat) {
    res.status(400);
    throw new Error("Chat not found");
  }
  else{
    res.json(updatedChat)
  }


}

const addToGroupController = async(req, res) => {
  const {chatId, userId} = req.body;

  const added = await Chat.findByIdAndUpdate(chatId, {
    $push: {users: userId}},
    {new: true}
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  if(!added) {
    res.status(400);
    throw new Error("chat not found");
  }
  else{
    res.json(added);
  }

}

const removeFromGroupController = async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(400);
    throw new Error("chat not found");
  } else {
    res.json(removed);
  }
};


module.exports = {
  accessChatsController,
  fetchChatsController,
  createGroupChatController,
  renameGroupController,
  addToGroupController,
  removeFromGroupController,
};
