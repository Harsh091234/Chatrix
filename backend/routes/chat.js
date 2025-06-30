const express = require("express");
const { create } = require("../models/user");
const router = express.Router();
const {
  accessChatsController,
  fetchChatsController,
  createGroupChatController,
  renameGroupController,
  addToGroupController,
  removeFromGroupController,
} = require("../controllers/chat");
const {protect} = require("../middlewares/auth");

router.post("/", protect, accessChatsController);
router.get("/", protect, fetchChatsController);
router.post("/group", protect, createGroupChatController);
router.put("/rename", protect, renameGroupController);
router.put("/groupremove", protect, removeFromGroupController);
router.put("/groupadd", protect, addToGroupController);

module.exports = router;