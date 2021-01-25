const router = require("express").Router();
const User = require("../schema/user");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  //   validate incoming data
  User.findOne({ username: username }, (err, user) => {
    if (err)
      return res.json({
        message: "There was an error",
        error: 1,
      });

    if (user) {
      return res.status(200).json({
        message: "User already Exist",
      });
    }

    const newUser = User({
      username,
    });
    newUser.password = newUser.hashPassword(password);
    newUser
      .save()
      .then((user) => {
        return res.json({
          message: "Account Creation was successful",
        });
      })
      .catch((err) =>
        res.json({
          error: true,
          message: "Something went wrong, try again",
        })
      );
  });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      return res.json({
        message: "Something went wrong",
        error: true,
      });

    if (!user)
      return res.json({
        message: "Invalid credentials provided",
      });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid)
      return res.json({
        message: "Invalid password submitted",
      });
    res
      .cookie("remeberme", 1, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      })
      .json({
        username: user.username,
        authenticated: true,
      });
  });
});

module.exports = router;
