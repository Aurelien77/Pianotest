const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
app.use(express.json());
app.use(cors());

const db = require("./models");

global.__basedir = __dirname;

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );
  if (req.method === "OPTIONS") res.send(200);
  else next();
};

app.use(allowCrossDomain);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(
  helmet.frameguard({
    action: "deny",
  })
);
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
