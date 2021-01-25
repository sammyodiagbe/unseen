const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 9000;
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("shdfjsfiajoiahhajksoajg;iiaghoihhaugu"));
app.use(
  cors({
    origin: "http://192.168.43.50:3000",
  })
);

app.use("/auth", require("./routes/auth"));
app.use("/messages", require("./routes/message"));
app.use(express.static("build"));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "build", "index.html"))
);
mongoose
  .connect("mongodb://localhost/secret_anonymous", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("we are fucking connected");
    });
  })
  .catch((err) => console.log(err));
