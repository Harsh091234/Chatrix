require("dotenv").config();
const express = require("express");

const cors = require("cors");
const connectToMongoDB = require("./config/db");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");


const app = express();
const PORT = process.env.PORT || 3000;
connectToMongoDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter)
app.use("/api/chat", chatRouter);
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`server starting on port: ${PORT}`));
