const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/AuthMiddleware");
const postsCtrl = require("../controllers/postpriv");

router.get("/", validateToken, postsCtrl.posts);

router.post("/", validateToken, postsCtrl.post);

router.get("/byId/:id", postsCtrl.id); // post indivi
router.get("/byId2/:id", postsCtrl.id2); // post indivi

router.get("/byuserId/:id", postsCtrl.userid);

router.put("/title", validateToken, postsCtrl.title);

router.put("/postText", validateToken, postsCtrl.posttext);

router.delete("/:postId", validateToken, postsCtrl.postId);

module.exports = router;
