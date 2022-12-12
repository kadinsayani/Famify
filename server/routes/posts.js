import express from "express";
import bodyParser from "body-parser";
import userAuthenticated from "../auth/Authentication.js";
import notify from "../notifications/notifier.js";
import { ObjectId } from "mongoose";

// models
import Post from "../models/Post.model.js";
import Family from "../models/Family.model.js"
import User from "../models/User.model.js";

const postRoutes = express.Router();
postRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

class PostView {

  constructor(_id, content, user, date, time, reactions) {

    this._id = _id ? _id : null;
    this.content = content ? content : null;
    this.user = user ? user : null;
    this.date = date ? date : null;
    this.time = time ? time : null;
    this.reactions = reactions ? reactions : null;

  }

}

// routes

postRoutes
  .route("/post")
  .get(userAuthenticated, (req, res) => {

    Family.findById(req.session.user.familyID, (err, family) => {
      if (err) return res.status(500).send("Error")
      if (!family) return res.status(404).send() // should never execute

      Post.find({
        '_id': {
          $in: family.posts
        }
      }, (err, posts) => {

        if (err) console.log(err)

        const userIDs = posts.map(post => 
          post.user
        )

        User.find({
          _id: { $in: userIDs }
        }, (err, users) => {

          const toSend = []

          for (let i =0; i < posts.length; i++) {

            if (posts[i].user) {

              for (let j=0; j < users.length; j++) {

                if (posts[i].user.toString() === users[j]._id.toString()) {
                  toSend.push(new PostView(
                    posts[i]._id,
                    posts[i].content,
                    users[j].username,
                    posts[i].date,
                    posts[i].time,
                    posts[i].reactions
                  ))
                }

              }

            } else {

              toSend.push(new PostView(
                posts[i]._id,
                posts[i].content,
                null,
                posts[i].date,
                posts[i].time,
                posts[i].reactions
              ))

            }

          }

          return res.send(toSend)

        })

      })

    })

  })

  // create a new post
  .post(userAuthenticated, (req, res) => {
    const content = req.body.content;
    const family = req.session.user.familyID;
    const user = req.session.user.id;

    const today = new Date()
    const date = today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const time = today.toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', second: 'numeric'})


    if (!content) return res.status(400).send("Content cannot be empty.");

    const newPost = new Post({
      content: content,
      family: family,
      user: user,
      date: date,
      time: time
    });

    // to use for notifications
    let familyMembers = []

    Family.findById(family, (err, family) => {
      if (err) return res.status(500).send(err)
      if (!family) return res.status(404).send()

      family.posts.push(newPost._id)
      family.save()

      familyMembers = []

      // remove self from being notified
      for (let i=0; i < family.members.length; i++) {

        if (family.members[i]._id.toString() !== user)
          familyMembers.push(family.members[i]._id)

      }
      console.log(user, familyMembers)

    })

    newPost.content = content;
    newPost.save((err) => {
      if (err) {
        return res.status(500).send("Error on save()");
      } else {
        notify(req.session.user.id, "has created a new post.", familyMembers)
        return res.send(newPost);
      }
      
    });

  });

// :id

postRoutes.route("/post/:id")

  // edit post
  .put(userAuthenticated, (req, res) => {

    Post.findById(req.params.id, (err, post) => {

      if (err) return res.status(500).send()
      if (!post) return res.status(404).send()

      // only if the user owns the post
      if (post.user.toString() === req.session.user.id.toString()) {

        Post.findByIdAndUpdate(req.params.id, {content: req.body.content}, {new: true}, (err, updated) => {

          if (err) return res.status(500).send()
          
          return res.status(200).send(updated)

        })

      } else {

        return res.status(403).send()

      }

    })

  })

  // delete post
  .delete(userAuthenticated, (req, res) => {

    Post.findById(req.params.id, (err, post) => {

      if (err) return res.send("An error occured.")
      if (!post) return res.status(404).send()

      // only if the user owns the post
      if (post.user.toString() === req.session.user.id.toString()) {

        Post.findByIdAndDelete(req.params.id, (err, post) => {

          if (err) return res.status(500).send()
          
          return res.status(200).send()

        })

      } else {

        return res.status(403).send()

      }

    })

  })

// reactions
postRoutes.route("/react/post/:id")
  .put(userAuthenticated, (req, res) => {

    const reaction = req.body.reaction

    Post.findById(req.params.id, (err, post) => {

      if (err) return res.status(500).send()
      if (!post) return res.status(404)

      // only if the post is in the same family
      if (req.session.user.familyID.toString() === post.family.toString()) {

        post.reactions.push({
          user: req.session.user.id,
          reaction: reaction
        })
        post.save()
          .then(_ => {
            return res.send(post)
          })
          .catch(_ => {
            return res.status(500).send()
          })

      } else {

        return res.status(403).send()

      }

    })

  })

  .delete(userAuthenticated, (req, res) => {

    // TODO: implement

  })

export default postRoutes;
