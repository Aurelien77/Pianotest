const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
app.use(express.json());

const db = require("./models");

global.__basedir = __dirname;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", helmet(), postRouter);

const postRouter2 = require("./routes/Postspriv");
app.use("/postspriv", helmet(), postRouter2);

const commentsRouter = require("./routes/Comments");
app.use("/comments", helmet(), commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", helmet(), usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", helmet(), likesRouter);

const imagesRouter = require("./routes/upload");
app.use("/upload", helmet(), imagesRouter);

const deleteRouter = require("./routes/Users");
app.use("/delete", helmet(), deleteRouter);

app.use(
  "/images",
  express.static(__dirname + "/ressources/static/assets/uploads")
);
db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
