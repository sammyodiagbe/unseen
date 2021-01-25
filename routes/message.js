const router = require("express").Router();
const Message = require("../schema/message");

router.post("/send", (req, res, next) => {
  const { message, target_user } = req.body;
  const newMessage = new Message({
    message,
    target_user,
  });
  newMessage
    .save()
    .then((message) => {
      console.log("message saved");
      res.json({
        message: "Your anonymous message has been sent",
      });
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong, please try again",
      });
    });
});

router.get("/allMessages", (req, res, next) => {
  const { username } = req.query;
  Message.find({ target_user: username }, (err, messages) => {
    if (err)
      return res.json({
        message: "Something went wrong, please try again",
        error: true,
      });
    console.log(messages);
    res.json({
      messages: messages.reverse(),
    });
  });
});
module.exports = router;
