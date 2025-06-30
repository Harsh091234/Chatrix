const { chats } = require('../data/data');

const indexController = (req, res) => {
    res.send(chats);
}
const idController = (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
};


module.exports = {
  indexController,
  idController
};