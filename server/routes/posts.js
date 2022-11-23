import express from "express"
import bodyParser from "body-parser"

// models
import Post from "../models/Post.model.js"

const postRoutes = express.Router();
postRoutes.use(bodyParser.urlencoded({
  extended: true
}));

// todo add family
postRoutes.route("/post")
    .post((req, res) => {
        const { family, content } = req.body;

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
    })

export default postRoutes;