import express from "express";
import bodyParser from "body-parser";
import userAuthenticated from "../auth/Authentication.js";

// models
import Notification from "../models/Notification.model.js";

const notificationRoutes = express.Router();
notificationRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

notificationRoutes.route("/notifications")
  .get(userAuthenticated, (req, res) => {

    Notification.find({

        $expr: {
            $in: [req.session.user.id, "$users"]
        }

    }, (err, notifications) => {

        if (err) return res.status(500).send()
        if (!notifications) res.status(404).send()

        return res.send(notifications)

    })

  })

export default notificationRoutes;