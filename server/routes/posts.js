import express from "express";
import bodyParser from "body-parser";
import userAuthenticated from "../auth/Authentication.js";

// models
import Post from "../models/Post.model.js";

const postRoutes = express.Router();
postRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// todo add family
postRoutes
  .route("/post")
  .get(userAuthenticated, (req, res) => {
    const postIDs = req.sessions.user.familyID.posts;

    res.posts = [];

    for (let i = 0; i < postIDs.length; i++) {
      Post.findById(postIDs[i], (err, post) => {
        if (err) return res.send("Error");
        res.posts.push(post);
      });
    }

    return res;
  })
  .post(userAuthenticated, (req, res) => {
    const { content } = req.body;
    const family = req.session.user.family;

    if (!content) {
      return res.send("Content cannot be empty.");
    } else {
      const newPost = new Post();
      newPost.content = content;
      newPost.save((err) => {
        if (err) {
          return res.send("Error on save()");
        } else {
          return res.send(newPost);
        }
      });
    }
  });

export default postRoutes;
