import express from "express";
import bodyParser from "body-parser";
import userAuthenticated from "../auth/Authentication.js";

// models
import Post from "../models/Post.model.js";
import Family from "../models/Family.model.js"

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

    Family.findById(req.session.user.familyID, (err, family) => {
      if (err) return res.send("Error")
      if (!family) return res.send("No family found.") // should never execute

      Post.find({
        '_id': {
          $in: family.posts
        }
      }, (err, posts) => {

        if (err) console.log(err)
        return res.send(posts)

      })

    })

  })
  .post(userAuthenticated, (req, res) => {
    const { content } = req.body;
    const family = req.session.user.familyID;

    if (!content) return res.send("Content cannot be empty.");

    const newPost = new Post({
      content: content,
      family: family
    });

    Family.findById(family, (err, family) => {
      if (err) return res.send(err)
      if (!family) return res.send("No family found.")

      family.posts.push(newPost._id)
      family.save()

    })

    newPost.content = content;
    newPost.save((err) => {
      if (err) {
        return res.send("Error on save()");
      } else {
        return res.send(newPost);
      }
      
    });

  });

export default postRoutes;
