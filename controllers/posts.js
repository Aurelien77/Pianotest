const { Posts, Posts2, Likes, Comments } = require("../models");

exports.posts = async (req, res) => {
  //listes des posts page principale
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  /*   const CommentsPosts = await Comments.findAll({
    where: { PostId: req.post.id },
  }); */
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
};

exports.post = async (req, res) => {
  //posts individuels

  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
};

exports.id = async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
};

exports.id2 = async (req, res) => {
  const id = req.params.id;
  const post = await Posts2.findByPk(id);
  res.json(post);
};
/* exports.idpriv = async (req, res) => {
  const id = req.params.id;
  const post = await Posts2.findByPk(id);
  res.json(post);
}; */

exports.userid = async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
};

exports.useridpriv = async (req, res) => {
  const id2 = req.params.id;
  const listOfPosts = await Posts2.findAll({
    where: { UserId: id2 },
    include: [Likes],
  });
  res.json(listOfPosts);
};

exports.title = async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
};

exports.posttext = async (req, res) => {
  const { newText, id } = req.body;
  await Posts.update({ postText: newText }, { where: { id: id } });
  res.json(newText);
};

exports.postId = async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
};
